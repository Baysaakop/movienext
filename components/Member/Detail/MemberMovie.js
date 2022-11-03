import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import api from '../../../api'
import { CheckOutlined, ClockCircleOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons'
import { List, Segmented } from 'antd'
import MovieCard from '../../Movie/MovieCard'

const MemberMovie = (props) => {
    const [type, setType] = useState('watched')
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

    function onSegmentChange(val) {        
        setType(val)
    }

    function getMovies() {
        if (type === 'watched') {
            return props.member.movies_watched
        } else if (type === 'like') {
            return props.member.movies_like
        } else if (type === 'watchlist') {
            return props.member.movies_watchlist
        } else if (type === 'rated') {
            return props.member.movies_rated
        } else {
            return []
        }
    }

    return (
        <div>
            <Segmented 
                block
                defaultValue={type}
                options={[
                    {
                        value: 'watched',
                        icon: <CheckOutlined />,
                    }, 
                    {
                        value: 'like',
                        icon: <HeartOutlined />,
                    }, 
                    {
                        value: 'watchlist',
                        icon: <ClockCircleOutlined />,
                    },  
                    {
                        value: 'rated',
                        icon: <StarOutlined />,
                    },                     
                ]}
                onChange={onSegmentChange}
                style={{ marginBottom: '8px' }}
            />
            <List 
                grid={{
                    gutter: 8,
                    xs: 3,
                    sm: 3,
                    md: 5,
                    lg: 5,
                    xl: 5,
                    xxl: 6,
                }}
                dataSource={getMovies()}                
                renderItem={movie => (
                    <List.Item key={movie.id}>                            
                        { type === 'rated' ? (
                            <MovieCard movie={movie.movie} score={movie.score} user={user} token={session ? session.token : undefined} />
                        ) : (
                            <MovieCard movie={movie} user={user} token={session ? session.token : undefined} />
                        )}                       
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MemberMovie