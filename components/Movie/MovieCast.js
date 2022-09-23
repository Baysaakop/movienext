import { Grid, Card, Carousel, List, Tooltip, Typography, Button } from 'antd'
import axios from 'axios';
import api from '../../api';
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
        if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 4
        } else {
            return 3
        }
    }

    function getPageCount() {
        return Math.ceil(total / getPageSize())
    }    

    return (            
        <div>
            <Typography.Title level={5}>Жүжигчид ({total})</Typography.Title>
            <div style={{ position: 'relative' }}>
                <Carousel ref={ref} dots={false}>
                    {[...Array(getPageCount())].map((x, i) =>
                        <List
                            key={i}
                            grid={{ gutter: 16, column: getPageSize() }}        
                            dataSource={data.slice(i * getPageSize(), (i+1) * getPageSize())}                              
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <Link href={`/artists/${item.artist.id}`}>
                                        <a>                                        
                                            <Card 
                                                hoverable
                                                cover={
                                                    <img
                                                        alt={item.artist.name}
                                                        src={item.artist.image}
                                                        style={{ width: '100%', height: 'auto' }}                                        
                                                    />
                                                }
                                                size="small"
                                            >
                                                <Card.Meta 
                                                    title={<Typography.Text style={{ fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.artist.name}</Typography.Text>} 
                                                    description={<Typography.Text style={{ color: '#555', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.role_name}</Typography.Text>} 
                                                />
                                            </Card>                                        
                                        </a>
                                    </Link>
                                </List.Item>
                            )}
                        />
                    )}                
                </Carousel>     
                { getPageCount() > 1 ? ([
                    <Button       
                        key={0}
                        icon={<LeftOutlined />}                  
                        type="default"                                        
                        size="large"
                        shape="circle"
                        style={{ position: 'absolute', left: '0', top: '50%', zIndex: '2', opacity: '0.5' }}
                        onClick={() => ref.current.prev()}
                    />,                      
                    <Button       
                        key={1}
                        icon={<RightOutlined />}                  
                        type="default"                        
                        size="large"
                        shape="circle"
                        style={{ position: 'absolute', right: '0', top: '50%', zIndex: '2', opacity: '0.5' }}
                        onClick={() => ref.current.next()}
                    />
                ]) : ( 
                    <></> 
                )}                         
            </div>   
        </div>     
    )
}

export default MovieCast