import { useEffect, useState } from 'react'
import { Row, Col, Typography, Space, Tag, Button, Avatar } from 'antd'
import Image from 'next/image'
import dayjs from 'dayjs'
import Link from 'next/link'
import MovieScore from '../MovieScore'
import MovieWatchedButton from '../Action/MovieWatchedButton'
import MovieLikeButton from '../Action/MovieLikeButton'
import MovieWatchlistButton from '../Action/MovieWatchlistButton'
import MovieRateButton from '../Action/MovieRateButton'
import MovieShareButton from '../Action/MovieShareButton'
import { MessageOutlined, PlayCircleOutlined, ShareAltOutlined } from '@ant-design/icons'
import MovieTrailerModal from './MovieTrailerModal'
import MovieReviewModal from '../Action/MovieReviewModal'
import MovieCrew from './MovieCrew'
import MovieCast from './MovieCast'
import MovieComments from './MovieComments'
import styles from '../../../styles/Movie/Detail/MovieDetailMobile.module.css'
import axios from 'axios'
import api from '../../../api'

const MovieDetailMobile = (props) => {
    const [reviewVisible, setReviewVisible] = useState(false)    
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
        return dayjs(releasedate).year().toString() + " он"
    }   

    function onBlur() { }

    function onMouseDown() { }

    function finishReview() {
        setReviewVisible(false)
        props.reload()
    }

    return (
        <div className={styles.mobile}> 
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
                    <Col span={8}>
                        <Image className={styles.poster} src={props.movie.poster !== null ? props.movie.poster : "/blank.png"} width={200} height={300} layout='responsive' />
                    </Col>
                    <Col span={16}>
                        <div className={styles.container}>
                            <div className={styles.title}>
                                {props.movie.title}                                                                      
                            </div>                                                                              
                            <Space size={[16, 8]} wrap>
                                <div>📅{getReleaseDate(props.movie.releasedate)}</div>
                                <div>⏲{props.movie.duration} мин</div>
                            </Space>
                            <div className={styles.bottom}>
                                <div className={styles.label}>Найруулагч</div>
                                <div className={styles.value}>                                    
                                    {directors ? directors.map(item => (
                                        <Link key={item.artist.id} href={`/artists/${item.artist.id}`}>
                                            <a target="_blank">{item.artist.name} </a>
                                        </Link>
                                    )) : <></>}
                                </div>
                            </div>         
                        </div>
                    </Col>
                </Row>
                <div className={styles.container}>
                    <Row gutter={[8, 16]}>
                        <Col span={12}>
                            <div className={styles.label}>Төрөл жанр</div>
                            <div className={styles.value}>
                                <Space size={[0, 4]} wrap>
                                    {props.movie.genres.map(genre => (
                                        <Tag key={genre.id} color="geekblue">{genre.name}</Tag>
                                    ))}
                                </Space>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.label}>Кино студи</div>
                            {props.movie.productions && props.movie.productions.length > 0 ? props.movie.productions[0].name : ''}
                        </Col>
                        <Col span={24}>         
                            <div className={styles.label}>Агуулга</div>                   
                            <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'цааш' }}>
                                {props.movie.description}
                            </Typography.Paragraph>
                        </Col>
                        <Col span={24}>         
                            <div className={styles.label} style={{ marginBottom: '16px' }}>Үнэлгээ</div>                   
                            <MovieScore score={props.movie.avg_score} size="large" />
                            <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                {props.movie.avg_score === 0 ? '/Саналын тоо хангалтгүй/' : `Нийт ${props.movie.score_count} санал`}
                            </div>
                        </Col>
                    </Row>                    
                </div>                
                <Row gutter={[8, 8]} className={styles.rowContainer}>
                    <Col span={24}>
                        <div className={styles.action}>
                            <div><MovieWatchedButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>
                            <div><MovieLikeButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>                                 
                            <div><MovieWatchlistButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>
                            <div><MovieRateButton onMouseDown={onMouseDown} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>                            
                            <div><MovieShareButton path={props.path} /></div>                            
                        </div>
                    </Col>
                    <Col span={12}>                        
                        <Button block disabled={props.movie.trailer === undefined || props.movie.trailer === null || props.movie.trailer === ''} type="primary" size="default" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)}>Трейлер</Button>
                        {trailerVisible ? <MovieTrailerModal title={props.movie.title} trailer={props.movie.trailer} hide={() => setTrailerVisible(false)} /> : <></>}
                    </Col>
                    {/* <Col span={12}>
                        <Button block type='default' size="default" icon={<MessageOutlined />} onClick={() => setReviewVisible(true)}>Сэтгэгдэл</Button>
                        {reviewVisible ? <MovieReviewModal movie={props.movie} user={props.user} token={props.token} hide={() => setReviewVisible(false)} finish={() => finishReview()} /> : <></>}
                    </Col> */}
                </Row>
                <div className={styles.container}>
                    <div className={styles.whereToWatch}>
                        <div className={styles.label}>Үзэх боломжтой суваг</div>
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
                <div className={styles.container}>
                    <div className={styles.label}>Уран бүтээлчид</div>
                    <MovieCrew id={props.movie.id} />
                </div>
                <div className={styles.container}>
                    <div className={styles.label}>Жүжигчид</div>
                    <MovieCast id={props.movie.id} />
                </div>
                <div className={styles.container}>
                    <div className={styles.label}>Сэтгэгдэл</div>
                    <MovieComments id={props.movie.id} />
                </div>
            </div>
        </div>
    )
}

export default MovieDetailMobile