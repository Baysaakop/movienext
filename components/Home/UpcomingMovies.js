import { Grid, Button, Typography, Carousel, List, Card } from 'antd'
import React from 'react'
import axios from 'axios';
import useSWR from 'swr';
import api from '../../api';
import { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MovieCard from '../Movie/MovieCard';

const fetcher = url => axios.get(url).then(res => res.data.results)

const { useBreakpoint } = Grid

const UpcomingMovies = (props) => {

    const ref = useRef()
    const screens = useBreakpoint()

    function getURL () {        
        let url = `${api.movielist}/?order=-releasedate`
        return url
    }

    const { data: movies } = useSWR(getURL, fetcher);

    function getPageSize() {
        if (screens.xxl) {
            return 6
        } else if (screens.xl) {
            return 5
        } else if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 5
        } else if (screens.sm) {
            return 4
        } else {
            return 2
        }
    }

    function getPageCount(movies) {
        return Math.ceil(movies.length / getPageSize())
    }    

    return (
        <div style={{ margin: '16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={4} style={{ borderLeft: '6px solid #000', paddingLeft: '6px' }}> Удахгүй нээлтээ хийх</Typography.Title>
                <Button size='large' type='link'>Бүгд</Button>
            </div>
            {movies ? (
                <div style={{ position: 'relative', padding: '8px 16px' }}>
                    <Carousel ref={ref} dots={false}>
                        {[...Array(getPageCount(movies))].map((x, i) =>
                            <List
                                key={i}
                                grid={{ gutter: 16, column: getPageSize() }}        
                                dataSource={movies.slice(i * getPageSize(), (i+1) * getPageSize())}                              
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <MovieCard movie={item} user={props.user} token={props.token} />                                        
                                    </List.Item>
                                )}
                            />
                        )}                
                    </Carousel>
                    { getPageCount(movies) > 1 ? ([
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
            ) : (
                <></>
            )}
        </div>        
    )
}

export default UpcomingMovies