import axios from 'axios'
import { Avatar, Button, Col, Divider, List, Rate, Row, Space, Tag, Typography } from 'antd'
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
import api from '../../../api'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const fetcher = url => axios.get(url).then(res => res.data)

const MovieDetail = () => {

    const router = useRouter()
    const { id } = router.query

    const [trailerVisible, setTrailerVisible] = useState(false)
    const [user, setUser] = useState()

    const { data: movie } = useSWR(`${api.moviedetail}/${id}`, fetcher);

    const { data: session, status } = useSession()

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    function onBlur() { }

    function onMouseDown() { }

    function getReleaseDate(releasedate) {
        if (dayjs(releasedate).month() === 0 && dayjs(releasedate).date() === 1) {
            return dayjs(releasedate).format("YYYY ????")
        }
        return dayjs(releasedate).format("YYYY ?????? MM ?????????? DD")
    }

    return (
        <div className={styles.movieDetail}>
            {movie ? (
                <div>
                    {movie.background ?
                        <div className={styles.background}>
                            <img
                                alt={movie.title}
                                src={movie.background}
                            />
                            <div className={styles.shadow}>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className={styles.movieInfo}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8} md={6}>
                                <img
                                    className={styles.poster}
                                    alt={movie.title}
                                    src={movie.poster !== null ? movie.poster : "/blank.png"}
                                />
                                <div className={styles.action}>
                                    <div><MovieWatchedButton onBlur={onBlur} movie={movie} user={user} token={session ? session.token : undefined} placement="top" /></div>
                                    <div><MovieLikeButton onBlur={onBlur} movie={movie} user={user} token={session ? session.token : undefined} placement="top" /></div>                                 
                                    <div><MovieWatchlistButton onBlur={onBlur} movie={movie} user={user} token={session ? session.token : undefined} placement="top" /></div>
                                    <div><MovieRateButton onMouseDown={onMouseDown} movie={movie} user={user} token={session ? session.token : undefined} placement="top" /></div>
                                </div>
                                {movie.trailer ? (
                                    <Button block type="primary" size="large" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)} >
                                        ??????????????
                                    </Button>
                                ) : (
                                    <Button block disabled type="primary" size="large" icon={<PlayCircleOutlined />} >
                                        ??????????????
                                    </Button>
                                )}
                                {trailerVisible ? <MovieTrailer title={movie.title} trailer={movie.trailer} hide={() => setTrailerVisible(false)} /> : <></>}
                                <List
                                    bordered
                                    header={<Typography.Title level={5} style={{ margin: 0 }}>???????? ?????????????????? ??????????????</Typography.Title>}
                                    dataSource={movie.platforms}
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
                            <Col xs={24} sm={16} md={18}>
                                <div className={styles.container}>
                                    <Typography.Title level={3} style={{ margin: 0 }}>{movie.title} ({dayjs(movie.releasedate).year()})</Typography.Title>
                                    <Divider style={{ margin: '8px 0' }} />
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>?????????? ????????</Typography.Title>
                                            {movie.genres.map(genre => (
                                                <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                            ))}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <Typography.Title level={5}>?????????? ??????????????</Typography.Title>
                                        </Col>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>??????????</Typography.Title>
                                            {getReleaseDate(movie.releasedate)}
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <Typography.Title level={5}>?????????????????? ??????????????</Typography.Title>
                                            {movie.duration} ??????
                                        </Col>
                                        <Col xs={24} sm={24} md={16}>
                                            <Typography.Title level={5}>??????????????</Typography.Title>
                                            <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: '????????' }}>
                                                {movie.description}
                                            </Typography.Paragraph>
                                        </Col>
                                        <Col xs={24} sm={24} md={8}>
                                            <Typography.Title level={5}>??????????????</Typography.Title>
                                            <MovieScore score={movie.avg_score} size="large" />
                                        </Col>
                                    </Row>
                                </div>
                                <div className={styles.container} style={{ marginTop: '16px' }}>                                    
                                    <MovieCrew id={id} />
                                </div>
                                <div className={styles.container} style={{ marginTop: '16px' }}>                                    
                                    <MovieCast id={id} />
                                </div>
                                <div className={styles.container} style={{ marginTop: '16px' }}>                                    
                                    <MovieComments id={id} token={session ? session.token : undefined} user={user} />
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

export default MovieDetail