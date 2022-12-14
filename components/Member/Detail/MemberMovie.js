import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import api from '../../../api'
import { ClockCircleOutlined, EyeOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons'
import { List, Segmented } from 'antd'
import MovieCard from '../../Movie/MovieCard'
import styles from '../../../styles/Member/MemberDetail.module.css'

const MemberMovie = ({ member }) => {
    const [type, setType] = useState('watched')
    //const [user, setUser] = useState()    
    const [memberLogs, setMemberLogs] = useState()
    const [userLogs, setUserLogs] = useState()
    const [openCard, setOpenCard] = useState()    

    useEffect(() => {
        getMovies()
    }, [member, type])    

    const { data: session, status } = useSession()

    if (status === "authenticated" && userLogs === undefined) {        
        axios({
            method: 'GET',
            url: `${api.movielogs}?user=${session.id}`
        })
        .then(res => {                                   
            setUserLogs(res.data.results)
        })
        .catch(err => {            
            console.log(err)
        })
    }

    function getMovies() {
        axios({
            method: 'GET',
            url: `${api.movielogs}?user=${member.id}&${type}=true`
        })
        .then(res => {
            setMemberLogs(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })     
    }
    
    function onSegmentChange(val) {        
        setType(val)
    }

    return (
        <div className={styles.memberMovie}>
            <Segmented 
                block
                defaultValue={type}
                options={[
                    {
                        value: 'watched',
                        icon: <EyeOutlined />,
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
                pagination={{ pageSize: 30, size: 'small' }}
                dataSource={memberLogs}                
                renderItem={item => (
                    <List.Item key={item.id}>                 
                        <MovieCard 
                            movie={item.movie} 
                            session={session}                                        
                            logs={userLogs}       
                            openCard={openCard}             
                            setOpenCard={(id) => setOpenCard(id)}      
                            score={type === 'rated' ? item.score : 0}                      
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MemberMovie