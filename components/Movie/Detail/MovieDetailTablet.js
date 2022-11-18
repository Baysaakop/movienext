import { useEffect, useState } from 'react'
import { Row, Col, Typography, Space, Tag, Button, Avatar } from 'antd'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import MovieScore from '../MovieScore'
import { PlayCircleOutlined, ShareAltOutlined } from '@ant-design/icons'
import MovieTrailerModal from './MovieTrailerModal'
import MovieCrew from './MovieCrew'
import MovieCast from './MovieCast'
import styles from '../../../styles/Movie/Detail/MovieDetailTablet.module.css'
import MovieShareModal from '../Action/MovieShareModal'
import axios from 'axios'
import api from '../../../api'
import MovieAction from '../Action/MovieAction'
import MovieFriendsWatched from './Log/MovieFriendsWatched'
import MovieFriendsWatchlist from './Log/MovieFriendsWatchlist'
import MovieReviews from './Log/MovieReviews'

const MovieDetailTablet = (props) => {
    const [shareVisible, setShareVisible] = useState(false)    
    const [trailerVisible, setTrailerVisible] = useState(false)
    const [directors, setDirectors] = useState()

    useEffect(() => {
        if (props.movie && directors === undefined) {
            axios({
                method: 'GET',
                url: `${api.moviecrew}?movie=${props.movie.id}&role=2`
            })
            .then(res => {        
                setDirectors(res.data.results)                                             
            })
            .catch(err => {
                console.log(err)                        
            })
        }
    }, [props.movie])

    function getReleaseDate (releasedate) {
        if (releasedate === undefined) {
            return 'Тодорхойгүй'
        }
        return moment(releasedate).year().toString() + " он"
    }   

    return (
        <div className={styles.tablet}> 
            {props.movie.background ? (
                <div className={styles.background}>
                    <Image src={props.movie.background} width={400} height={200} layout='responsive' />                                        
                    <div className={styles.mask}></div>
                </div>
            ) : (
                <></>
            )}
            <div className={styles.info}>
                <Row gutter={[8, 8]} className={styles.rowContainer}>
                    <Col span={7}>
                        <Image className={styles.poster} src={props.movie.poster !== null ? props.movie.poster : "/blank.png"} width={200} height={300} layout='responsive' />
                    </Col>
                    <Col span={17}>
                        <div className={styles.container}>
                            <div className={styles.title}>
                                {props.movie.title}                                                                      
                            </div>                                                                              
                            <Row gutter={[16, 8]}>
                                <Col span={24}>
                                    <Space size={[16, 8]} wrap>
                                        <div className={styles.value}>📅{getReleaseDate(props.movie.releasedate)}</div>
                                        <div className={styles.value}>⏲{props.movie.duration} мин</div>
                                        <div className={styles.value}>
                                            <Space size={[0, 4]} wrap>
                                                {props.movie.genres.map(genre => (
                                                    <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                                ))}
                                            </Space>
                                        </div>
                                    </Space>
                                </Col>
                                <Col span={16}>
                                    <Row gutter={[16, 8]}>
                                        <Col span={12}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>Найруулагч</Typography.Title> 
                                            <div className={styles.value}>
                                                {directors ? directors.map(item => (
                                                    <Link key={item.artist.id} href={`/artists/${item.artist.id}`}>
                                                        <a target="_blank">{item.artist.name} </a>
                                                    </Link>
                                                )) : <></>}
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>Кино студи</Typography.Title> 
                                            <div className={styles.value}>
                                                {props.movie.productions && props.movie.productions.length > 0 ? props.movie.productions[0].name : ''}
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <Typography.Title level={5} style={{ margin: 0 }}>Агуулга</Typography.Title>              
                                            <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'цааш' }} style={{ marginBottom: '0' }}>
                                                {props.movie.description}
                                            </Typography.Paragraph>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Typography.Title level={5}>Үнэлгээ</Typography.Title>                   
                                    <MovieScore score={props.movie.avg_score} size="large" />
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        {props.movie.avg_score === 0 ? '/Саналын тоо хангалтгүй/' : `Нийт ${props.movie.score_count} санал`}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12}>
                        <MovieAction movie={props.movie} session={props.session} container="detail" />   
                    </Col>
                    <Col span={6}>                        
                        <Button className={styles.textButton} block disabled={props.movie.trailer === undefined || props.movie.trailer === null || props.movie.trailer === ''} type="primary" size="default" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)}>Трейлер</Button>
                        {trailerVisible ? <MovieTrailerModal title={props.movie.title} trailer={props.movie.trailer} hide={() => setTrailerVisible(false)} /> : <></>}
                    </Col>
                    <Col span={6}>
                        <Button className={styles.textButton} block type='default' size="default" icon={<ShareAltOutlined />} onClick={() => setShareVisible(true)}>Share</Button>
                        {shareVisible ? <MovieShareModal url={props.path} hide={() => setShareVisible(false)} /> : <></>}  
                    </Col>
                </Row>                             
                <div className={styles.container}>
                    <div className={styles.whereToWatch}>                        
                        <Typography.Title level={5} style={{ margin: 0 }}>Үзэх боломжтой суваг</Typography.Title> 
                        <Space size={4}>
                            {props.movie.platforms.map(item => (
                                <Link key={item.id} href={item.url}>
                                    <a>
                                        <Avatar size="default" src={item.platform.logo} />
                                    </a>
                                </Link>
                            ))}
                        </Space>
                    </div>
                </div>             
                <MovieCrew id={props.movie.id} />
                <MovieCast id={props.movie.id} />             
                <MovieFriendsWatched id={props.movie.id} session={props.session} />
                <MovieFriendsWatchlist id={props.movie.id} session={props.session} />            
                <MovieReviews id={props.movie.id} session={props.session} />       
            </div>
        </div>
    )
}

export default MovieDetailTablet