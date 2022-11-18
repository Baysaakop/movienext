import { Badge, Button, Carousel, Grid, List, Space, Tooltip, Typography } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { HeartOutlined,  LeftOutlined,  MessageOutlined, PercentageOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import api from '../../../../api';
import MemberAvatar from '../../../Member/Detail/MemberAvatar'
import styles from '../../../../styles/Movie/Detail/MovieCastCrew.module.css'

const { useBreakpoint } = Grid

const MovieFriendsWatched = (props) => {
    const ref = useRef()
    const screens = useBreakpoint()
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.session && props.id) {
            axios({
                method: 'GET',
                url: `${api.movielogs}?movie=${props.id}&following=${props.session.id}&watched=True`
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

    function getScore(score) {         
        let full = Math.floor(score / 2)
        let half = score % 2       
        return <div>
            {full > 0 ? <StarFilled disabled style={{ color: '#28202f', fontSize: '9px' }} /> : <></>}            
            {full > 1 ? <StarFilled disabled style={{ color: '#28202f', fontSize: '9px' }} /> : <></>}            
            {full > 2 ? <StarFilled disabled style={{ color: '#28202f', fontSize: '9px' }} /> : <></>}            
            {full > 3 ? <StarFilled disabled style={{ color: '#28202f', fontSize: '9px' }} /> : <></>}            
            {full > 4 ? <StarFilled disabled style={{ color: '#28202f', fontSize: '9px' }} /> : <></>}            
            {half > 0 ? <PercentageOutlined disabled style={{ color: '#28202f', fontSize: '8px' }} /> : <></>}            
        </div>
    }

    function getBadge(log) {
        if (log.comment !== null && log.comment !== "") {
            return <MessageOutlined />
        } else if (log.like === true) {
            return <HeartOutlined style={{ color: '#ff5252' }} />
        } else {
            return <></>
        }
    }

    if (data.length > 0) {
        return (            
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography.Title level={5}>Үзсэн хүмүүс</Typography.Title>            
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
                                                <Badge count={getBadge(item)} offset={[2, 4]}>                                    
                                                    <MemberAvatar member={item.user} size={40} />                                                                              
                                                    {getScore(item.score)}
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

export default MovieFriendsWatched