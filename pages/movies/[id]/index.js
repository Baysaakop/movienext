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

const MovieDetail = ({ movie }) => {

    console.log(movie)
    const [trailerVisible, setTrailerVisible] = useState(false)

    function onBlur() {}

    function onMouseDown() {}

    return (
        <div className={styles.movieDetail}>
            {/* <div className={styles.landscape}>
                <img className={styles.landscape} alt={movie.title} src={movie.landscape} />
                <div className={styles.shadow}></div>                
            </div>             */}
            <div className={styles.movieInfo}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={7}>
                        <img className={styles.poster} alt={movie.title} src={movie.poster} />
                        <div className={styles.action}>
                            <div><MovieLikeButton onBlur={onBlur} movie={movie} /></div>
                            <div><MovieWatchedButton onBlur={onBlur} movie={movie} /></div>
                            <div><MovieWatchlistButton onBlur={onBlur} movie={movie} /></div>
                            <div><MovieRateButton onMouseDown={onMouseDown} movie={movie} /></div>                                                    
                        </div>
                        { movie.trailer ? (
                            <Button block type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)} >
                                Трейлер 
                            </Button>                        
                        ) : (
                            <Button block disabled type="primary" size="large" icon={<PlayCircleOutlined />} >
                                Трейлер 
                            </Button>                        
                        )}             
                        { trailerVisible ? <MovieTrailer title={movie.title} trailer={movie.trailer} hide={() => setTrailerVisible(false)} /> : <></> }           
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={17}>
                        <div className={styles.container}>
                            <Typography.Title level={3} style={{ margin: 0 }}>{movie.title} ({dayjs(movie.releasedate).year()})</Typography.Title>
                            <Divider style={{ margin: '8px 0' }} />
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12}>
                                    <Typography.Title level={5}>Төрөл жанр</Typography.Title>
                                    {movie.genres.map(genre => (
                                        <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                    ))}
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Typography.Title level={5}>Насны ангилал</Typography.Title>                                    
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Typography.Title level={5}>Нээлт</Typography.Title>
                                    {movie.releasedate}
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <Typography.Title level={5}>Үргэлжлэх хугацаа</Typography.Title>
                                    {movie.duration} мин
                                </Col>
                                <Col xs={24} sm={24} md={16}>
                                    <Typography.Title level={5}>Агуулга</Typography.Title>
                                    {movie.plot}
                                </Col>
                                <Col xs={24} sm={24} md={8}>                                                              
                                    <Typography.Title level={5}>Үнэлгээ</Typography.Title>                                    
                                    <MovieScore score={movie.avg_score} size="large" />
                                </Col>
                            </Row>                            
                        </div>                        
                    </Col>
                    <Col span={24}>
                        <MovieCrew />
                    </Col>
                    <Col span={24}>
                        <MovieCast />
                    </Col>
                    <Col span={24}>
                        <MovieComments />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const res = await axios(`https://movieplusback.herokuapp.com/api/movies/films/${id}`)
    const movie = res.data;

    return {
        props: { movie }
    }
}

export const getStaticPaths = async () => {
    const res = await axios(`https://movieplusback.herokuapp.com/api/movies/films/`)
    const movies = res.data.results;

    const ids = movies.map(movie => movie.id);
    const paths = ids.map(id => ({ params: { id: id.toString() } }));

    return {
        paths,
        fallback: false
    }
}

export default MovieDetail