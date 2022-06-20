import axios from 'axios'
import { Button, Col, Divider, Row, Tag, Typography } from 'antd'
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

const fetcher = url => axios.get(url).then(res => res.data)

const MovieDetail = () => {
    
    const router = useRouter()
    const { id } = router.query

    const [trailerVisible, setTrailerVisible] = useState(false)    

    function onBlur() {}

    function onMouseDown() {}

    const { data } = useSWR(`https://movieplusback.herokuapp.com/api/movies/moviedetail/${id}`, fetcher);    

    return (
        <div className={styles.movieDetail}>            
            { data ? (
                <div>
                    {/* <div className={styles.landscape}>                
                        <Image 
                            className={styles.landscape} 
                            alt={data.title}
                            src={data.landscape}
                            width={800}
                            height={350}
                            layout="responsive"
                        />
                        <div className={styles.shadow}></div>                
                    </div>,             */}
                    <div className={styles.movieInfo}>
                        <Row gutter={[16, 16]}>
                            <Col xs ={24} sm={24} md={8} lg={7}>                                
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
                            </Col>
                            <Col xs={24} sm={24} md={16} lg={17}>
                                <div className={styles.container}>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{data.title} ({dayjs(data.releasedate).year()})</Typography.Title>
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={24} md={12}>
                                            <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                            {data.genres.map(genre => (
                                                <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                            ))}
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Typography.Title level={5}>Насны ангилал</Typography.Title>                                    
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Typography.Title level={5}>Нээлт</Typography.Title>
                                            {data.releasedate}
                                        </Col>
                                        <Col xs={24} sm={24} md={12}>
                                            <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                            {data.duration} мин
                                        </Col>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>Агуулга</Typography.Title>
                                            {data.plot}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>                                                              
                                            <Typography.Title level={5}>Үнэлгээ</Typography.Title>                                    
                                            <MovieScore score={data.avg_score} size="large" />
                                        </Col>
                                    </Row>                            
                                </div>                        
                            </Col>
                            <Col span={24}>
                                <MovieCrew id={id} />
                            </Col>
                            <Col span={24}>
                                <MovieCast id={id} />
                            </Col>
                            <Col span={24}>
                                <MovieComments />
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