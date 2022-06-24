import axios from 'axios'
import { Avatar, Button, Col, Divider, List, Row, Space, Tag, Typography } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import styles from '../../../styles/Movie.module.css'
import dayjs from 'dayjs'
import MovieScore from '../../../components/Movie/MovieScore'
import MovieLikeButton from '../../../components/Movie/MovieLikeButton'
import MovieWatchedButton from '../../../components/Movie/MovieWatchedButton'
import MovieRateButton from '../../../components/Movie/MovieRateButton'
import MovieWatchlistButton from '../../../components/Movie/MovieWatchlistButton'
import MovieComments from '../../../components/Movie/MovieComments'
import MovieCrew from '../../../components/Movie/MovieCrew'
import MovieCast from '../../../components/Movie/MovieCast'
import { useState } from 'react';
import MovieTrailer from '../../../components/Movie/MovieTrailer'
import useSWR from 'swr';
import { useRouter } from 'next/router'
import Loading from '../../../components/Loading'
import Image from 'next/image'
import api from '../../../api'
import Link from 'next/link'

const fetcher = url => axios.get(url).then(res => res.data)

const MovieDetail = () => {
    
    const router = useRouter()
    const { id } = router.query

    const [trailerVisible, setTrailerVisible] = useState(false)    

    function onBlur() {}

    function onMouseDown() {}

    const { data } = useSWR(`${api.moviedetail}/${id}`, fetcher);    

    return (
        <div className={styles.movieDetail}>            
            { data ? (
                <div>
                    { data.background ? 
                        <div className={styles.background}>                
                            <img                             
                                alt={data.title}
                                src={data.background}
                            />
                            <div className={styles.shadow}>
                                <div className={styles.text}>{data.title}</div> 
                            </div>                                           
                        </div>         
                    : 
                        <></>
                    }
                    <div className={styles.movieInfo}>
                        <Row gutter={[16, 16]}>
                            <Col xs ={24} sm={24} md={6}>                                
                                <Image 
                                    className={styles.poster}
                                    alt={data.title}
                                    src={data.poster}
                                    width={300}
                                    height={450}
                                    layout="responsive"
                                />
                                <div className={styles.action}>
                                    <div><MovieLikeButton onBlur={onBlur} movie={data} /></div>
                                    <div><MovieWatchedButton onBlur={onBlur} movie={data} /></div>
                                    <div><MovieWatchlistButton onBlur={onBlur} movie={data} /></div>
                                    <div><MovieRateButton onMouseDown={onMouseDown} movie={data} /></div>                                                    
                                </div>
                                { data.trailer ? (
                                    <Button block type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)} >
                                        Трейлер 
                                    </Button>                        
                                ) : (
                                    <Button block disabled type="primary" size="large" icon={<PlayCircleOutlined />} >
                                        Трейлер 
                                    </Button>                        
                                )}             
                                { trailerVisible ? <MovieTrailer title={data.title} trailer={data.trailer} hide={() => setTrailerVisible(false)} /> : <></> }    
                                <List
                                    bordered
                                    header={<Typography.Title level={5} style={{ margin: 0 }}>Үзэх боломжтой сувгууд</Typography.Title>}     
                                    dataSource={data.platforms}
                                    style={{ background: '#fff', marginTop: '16px' }}
                                    renderItem={item => (
                                        <List.Item key={item.id}>
                                            <Link href={item.url}>
                                                <a>
                                                    <Space size={16} wrap>
                                                        <Avatar size="default" src={item.platform.logo} />
                                                        <div>{item.platform.name}</div>
                                                    </Space>
                                                </a>
                                            </Link>                                            
                                        </List.Item>
                                    )}
                                />
                            </Col>
                            <Col xs={24} sm={24} md={18}>
                                <div className={styles.container}>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{data.title} ({dayjs(data.releasedate).year()})</Typography.Title>
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                            {data.genres.map(genre => (
                                                <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                            ))}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <Typography.Title level={5}>Насны ангилал</Typography.Title>                                    
                                        </Col>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>Нээлт</Typography.Title>
                                            {data.releasedate}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                            {data.duration} мин
                                        </Col>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>Агуулга</Typography.Title>
                                            {data.description}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>                                                              
                                            <Typography.Title level={5}>Үнэлгээ</Typography.Title>                                    
                                            <MovieScore score={data.avg_score} size="large" />
                                        </Col>
                                    </Row>                            
                                </div>   
                                <div className={styles.container} style={{ marginTop: '16px' }}>
                                    <Typography.Title level={5}>Баг бүрэлдэхүүн</Typography.Title>   
                                    <MovieCrew id={id} />
                                </div>     
                                <div className={styles.container} style={{ marginTop: '16px' }}>
                                    <Typography.Title level={5}>Жүжигчид</Typography.Title>   
                                    <MovieCast id={id} />
                                </div>    
                                <div className={styles.container} style={{ marginTop: '16px' }}>
                                    <Typography.Title level={5}>Сэтгэгдэл</Typography.Title>   
                                    <MovieComments />
                                </div>                     
                            </Col>                                                        
                        </Row>
                    </div>
                </div>
            ) : (
                <Loading />
            )}           
        </div>
    )
}

// export const getStaticProps = async (context) => {
//     const { id } = context.params;
//     const res = await axios(`http://localhost:8000/api/movies/moviedetail/?${id}`)
//     const movie = res.data;

//     return {
//         props: { movie }
//     }
// }

// export const getStaticPaths = async () => {
//     const res = await axios(`http://localhost:8000/api/movies/movielist/`)
//     const movies = res.data.results;

//     const ids = movies.map(movie => movie.id);
//     const paths = ids.map(id => ({ params: { id: id.toString() } }));

//     return {
//         paths,
//         fallback: false
//     }
// }

export default MovieDetail