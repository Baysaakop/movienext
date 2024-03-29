import { Typography } from 'antd'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import api from '../api'
import HomeCarousel from '../components/Home/HomeCarousel'
import HomeStats from '../components/Home/HomeStats'
import HomeArticles from '../components/Home/HomeArticles'
import MovieSwiper from '../components/Home/MovieSwiper'

export default function Home() {

    const [user, setUser] = useState()

    const { data: session, status } = useSession()

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    return (
        <div>                  
            <HomeCarousel />
            <MovieSwiper title="Нээлтээ хийсэн" order="-releasedate" user={user} token={session ? session.token : undefined} />            
            <MovieSwiper title="Шинээр нэмэгдсэн" order="-created_at" user={user} token={session ? session.token : undefined} />
            <div style={{ margin: '24px 0' }}>
                <Typography.Title level={3} style={{ lineHeight: '160px', textAlign: 'center', borderRadius: '4px', background: '#364d79', color: '#fff' }}>Ads</Typography.Title>
            </div>            
            <MovieSwiper title="Хамгийн эрэлттэй" order="-view_count" user={user} token={session ? session.token : undefined} />
            <MovieSwiper title="TOP 100" order="-avg_score" user={user} token={session ? session.token : undefined} />
            <HomeStats />
            <HomeArticles />
        </div>
    )
}
