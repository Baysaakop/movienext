import { Badge, Button, Carousel, Grid, List, Space, Tooltip, Typography } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import api from '../../../../api';
import MemberAvatar from '../../../Member/Detail/MemberAvatar'
import styles from '../../../../styles/Movie/Detail/MovieCastCrew.module.css'

const { useBreakpoint } = Grid

const MovieFriendsWatchlist = (props) => {
    const ref = useRef()
    const screens = useBreakpoint()
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.session && props.id) {
            axios({
                method: 'GET',
                url: `${api.movielogs}?movie=${props.id}&following=${props.session.id}&watchlist=True`
            })
            .then(res => {                                     
                setData(res.data.results)            
            })
            .catch(err => {            
                console.log(err)
            })
        }        
    }, [props.session, props.id]) 

    function getPageSize() {
        if (screens.xxl) {
            return 10
        } else if (screens.xl) {
            return 8
        } else if (screens.lg) {
            return 8
        } else if (screens.md) {
            return 8
        } else {
            return 5
        }
    }    

    function getPageCount(total) {
        return Math.ceil(total / getPageSize())
    }

    if (data.length > 0) {
        return (            
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography.Title level={5}>Дараа үзэх</Typography.Title>            
                    <div>
                        {getPageCount(data.length) > 1 ? (
                            <Space>
                                <Button
                                    key={0}
                                    icon={<LeftOutlined />}                  
                                    type="default"                                        
                                    size="small"
                                    shape="circle"                         
                                    onClick={() => ref.current.prev()}
                                />              
                                <Button       
                                    key={1}
                                    icon={<RightOutlined />}                  
                                    type="default"                        
                                    size="small"
                                    shape="circle"                   
                                    onClick={() => ref.current.next()}
                                />
                            </Space>
                        ) : ( 
                            <></> 
                        )}
                    </div>
                </div>
                <Carousel ref={ref} dots={false}>
                    {[...Array(getPageCount(data.length))].map((x, i) =>
                        <List                         
                            key={i}    
                            className={styles.slider}       
                            grid={{ gutter: 8, column: getPageSize() }}                        
                            dataSource={data.slice(i * getPageSize(), (i+1) * getPageSize())}                             
                            renderItem={item => (
                                <List.Item key={item.id} className={styles.sliderItem}>                        
                                    <Link href={`/members/${item.user.id}`}>
                                        <a>                    
                                            <Tooltip title={item.user.username}>
                                                <Badge count={<ClockCircleOutlined />} offset={[2, 4]}>                                    
                                                    <MemberAvatar member={item.user} size={40} />                                                                              
                                                </Badge>
                                            </Tooltip>
                                        </a>
                                    </Link>
                                </List.Item>
                            )}
                        />        
                    )}  
                </Carousel>         
            </div>            
        )
    } else {
        return (
            <></>
        )
    }
}

export default MovieFriendsWatchlist