import { Grid, List, Avatar, Typography, Carousel, Empty, Card, Button, Space } from 'antd'
import axios from 'axios';
import api from '../../../api';
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import styles from '../../../styles/Movie/Detail/MovieCastCrew.module.css'
import Image from 'next/image';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid

const MovieCast = ({ id }) => {
    const ref = useRef()
    const screens = useBreakpoint()
    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.moviecast}?movie=${id}`
        })
        .then(res => {                   
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    function getPageSize() {
        if (screens.xxl) {
            return 6
        } else if (screens.xl) {
            return 5
        } else if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 6
        } else if (screens.sm) {
            return 6
        } else {
            return 3
        }
    }  

    function getPageCount(total) {
        return Math.ceil(total / getPageSize())
    }

    return (
        <div>            
            <div className={styles.container}>
                <div className={styles.header}>                                        
                    <Typography.Title level={5} style={{ margin: 0 }}>Жүжигчид</Typography.Title>
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
                { data.length > 0 ? (
                    <Carousel ref={ref} dots={false}>
                        {[...Array(getPageCount(data.length))].map((x, i) =>
                            <List                            
                                key={i}    
                                className={styles.slider}
                                grid={{ gutter: 16, column: getPageSize() }}                        
                                dataSource={data.slice(i * getPageSize(), (i+1) * getPageSize())}                              
                                renderItem={item => (
                                    <List.Item key={item.id} className={styles.sliderItem}>                        
                                        <Link href={`/artists/${item.artist.id}`}>
                                            <Card
                                                hoverable
                                                cover={<Image alt={item.artist.name} src={item.artist.image ? item.artist.image : "/blank.png"} width={100} height={150} layout="responsive" />}
                                                size="small"
                                            >
                                                <div className={styles.artistName}>{item.artist.name}</div>
                                                <div className={styles.artistRole}>{item.role_name}</div>          
                                            </Card>
                                        </Link>
                                    </List.Item>
                                )}
                            />                               
                        )}                        
                    </Carousel>  
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}                         
            </div>     
        </div>   
    )
}

export default MovieCast