import { Grid, Carousel, List, Button, Avatar } from 'antd'
import axios from 'axios';
import api from '../../../api';
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MemberAvatar from '../../Member/Detail/MemberAvatar'
import styles from '../../../styles/Movie/Detail/MovieCastCrew.module.css'

const { useBreakpoint } = Grid

const MovieActivities = ({ id }) => {
    const ref = useRef()
    const screens = useBreakpoint()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.userlist}/`
        })
        .then(res => {                        
            console.log(res.data)
            setTotal(res.data.count)
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    function getPageSize() {
        if (screens.xxl) {
            return 10
        } else if (screens.xl) {
            return 8
        } else if (screens.lg) {
            return 8
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
                                    <Link href={`/members/${item.id}`}>
                                        <a>                    
                                            <MemberAvatar member={item} size={48} />                                                                                        
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

export default MovieActivities