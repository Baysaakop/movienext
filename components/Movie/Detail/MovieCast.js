import { Grid, Carousel, List, Button, Avatar } from 'antd'
import axios from 'axios';
import api from '../../../api';
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from '../../../styles/Movie/Detail/MovieCastCrew.module.css'

const { useBreakpoint } = Grid

const MovieCast = ({ id }) => {
    const ref = useRef()
    const screens = useBreakpoint()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.moviecast}?movie=${id}`
        })
        .then(res => {                        
            setTotal(res.data.count)
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
        } else {
            return 4
        }
    }

    function getPageCount() {
        return Math.ceil(total / getPageSize())
    }    

    return (            
        <div>            
            <div className={styles.container}>
                <Carousel ref={ref} dots={false}>
                    {[...Array(getPageCount())].map((x, i) =>
                        <List
                            key={i}
                            grid={{ gutter: 16, column: getPageSize() }}        
                            dataSource={data.slice(i * getPageSize(), (i+1) * getPageSize())}                              
                            renderItem={item => (
                                <List.Item key={item.id} className={styles.listItem}>
                                    <Link href={`/artists/${item.artist.id}`}>
                                        <a>                    
                                            <Avatar className={styles.artistAvatar} shape='circle' size={64} src={item.artist.image ? item.artist.image : "/blank.png"} />
                                            <div className={styles.artistName}>{item.artist.name}</div>
                                            <div className={styles.artistRole}>{item.role_name}</div>                                                               
                                        </a>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    )}                
                </Carousel>     
                { screens.xl ? (
                    getPageCount() > 1 ? ([
                        <Button       
                            key={0}
                            icon={<LeftOutlined />}                  
                            type="default"                                        
                            size="large"
                            shape="circle"
                            className={styles.leftArrow}  
                            onClick={() => ref.current.prev()}
                        />,                      
                        <Button       
                            key={1}
                            icon={<RightOutlined />}                  
                            type="default"                        
                            size="large"
                            shape="circle"
                            className={styles.rightArrow}      
                            onClick={() => ref.current.next()}
                        />
                    ]) : ( 
                        <></> 
                    )
                ) : (
                    <></>
                )}                         
            </div>   
        </div>     
    )
}

export default MovieCast