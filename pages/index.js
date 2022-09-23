import { Col, Row, Typography } from 'antd'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import api from '../api'
import HomeCarousel from '../components/Home/HomeCarousel'
import NewMovies from '../components/Home/NewMovies'
import UpcomingMovies from '../components/Home/UpcomingMovies'

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
            <NewMovies user={user} token={session ? session.token : undefined} />
            <div style={{ margin: '24px 0' }}>
                <Typography.Title level={3} style={{ lineHeight: '160px', textAlign: 'center', borderRadius: '4px', background: '#364d79', color: '#fff' }}>Ads</Typography.Title>
            </div>
            <UpcomingMovies user={user} token={session ? session.token : undefined} />
            <Row gutter={16}>
                <Col xs={24} sm={24} md={16}>
                    
                </Col>
                <Col xs={24} sm={24} md={16}>
                    
                </Col>
            </Row>
        </div>
    )
}
