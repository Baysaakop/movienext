import { useEffect, useState } from 'react'
import { Col, Row, Space, Tag, Typography, Button, List, Avatar } from 'antd'
import { MessageOutlined, PlayCircleOutlined, ShareAltOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import MovieScore from '../MovieScore'
import MovieWatchedButton from '../Action/MovieWatchedButton'
import MovieLikeButton from '../Action/MovieLikeButton'
import MovieWatchlistButton from '../Action/MovieWatchlistButton'
import MovieRateButton from '../Action/MovieRateButton'
import MovieTrailerModal from './MovieTrailerModal'
import MovieReviewModal from '../Action/MovieReviewModal'
import MovieShareModal from '../Action/MovieShareModal'
import MovieCrew from './MovieCrew'
import MovieCast from './MovieCast'
import MovieComments from './MovieComments'
import styles from '../../../styles/Movie/Detail/MovieDetailDesktop.module.css'
import MovieActivities from './MovieActivities'
import axios from 'axios'
import api from '../../../api'

const MovieDetailDesktop = (props) => {
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
        return dayjs(releasedate).year().toString() + " он"
    }   

    function onBlur() { }

    function onMouseDown() { }

    return (
        <div className={styles.desktop}>
            {props.movie.background ? (
                <div className={styles.background}>
                    <Image src={props.movie.background} width={1000} height={500} layout='responsive' />                                        
                    <div className={styles.mask}></div>
                </div>
            ) : (
                <></>
            )}
            <div className={styles.info}>
                <Row gutter={[16, 16]} className={styles.rowContainer}>
                    <Col sm={10} md={8} lg={7} xl={7} xxl={6}>
                        <div className={styles.left}>
                            <Image className={styles.poster} src={props.movie.poster !== null ? props.movie.poster : "/blank.png"} width={200} height={300} layout='responsive' />                        
                            <div className={styles.action}>
                            <div><MovieWatchedButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>
                            <div><MovieLikeButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>                                 
                            <div><MovieWatchlistButton onBlur={onBlur} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>
                            <div><MovieRateButton onMouseDown={onMouseDown} movie={props.movie} session={props.session} logs={props.logs} placement="top" size="large" /></div>                            
                            </div>
                            <div className={styles.buttons}>
                                {/* Review Button */}
                                {/* <Button block type='default' size="default" icon={<MessageOutlined />} onClick={() => setReviewVisible(true)}>Сэтгэгдэл</Button>
                                {reviewVisible ? <MovieReviewModal movieID={props.movie.id} user={props.user} token={props.token} hide={() => setReviewVisible(false)} finish={() => finishReview()} /> : <></>} */}
                                {/* Share Button */}
                                <Button block type='default' size="default" icon={<ShareAltOutlined />} onClick={() => setShareVisible(true)}>Share</Button>
                                {shareVisible ? <MovieShareModal url={props.path} hide={() => setShareVisible(false)} /> : <></>}
                                {/* Trailer Button */}
                                <Button block disabled={props.movie.trailer === undefined || props.movie.trailer === null || props.movie.trailer === ''} type="primary" size="default" icon={<PlayCircleOutlined />} onClick={() => setTrailerVisible(true)}>Трейлер</Button>
                                {trailerVisible ? <MovieTrailerModal title={props.movie.title} trailer={props.movie.trailer} hide={() => setTrailerVisible(false)} /> : <></>}                            
                            </div>
                            <List
                                bordered
                                header={<Typography.Title level={5} style={{ margin: 0 }}>Үзэх боломжтой суваг</Typography.Title>}
                                dataSource={props.movie.platforms}
                                size="small"
                                style={{ background: '#fff' }}
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
                        </div>
                    </Col>
                    <Col sm={14} md={16} lg={17} xl={17} xxl={18}>
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
                                            <div className={styles.label}>Найруулагч</div>
                                            <div className={styles.value}>
                                                {directors ? directors.map(item => (
                                                    <Link key={item.artist.id} href={`/artists/${item.artist.id}`}>
                                                        <a target="_blank">{item.artist.name} </a>
                                                    </Link>
                                                )) : <></>}
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className={styles.label}>Кино студи</div>
                                            <div className={styles.value}>
                                                {props.movie.productions && props.movie.productions.length > 0 ? props.movie.productions[0].name : ''}
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div className={styles.label}>Агуулга</div>
                                            <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'цааш' }} style={{ marginBottom: '0' }}>
                                                {props.movie.description}
                                            </Typography.Paragraph>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <div className={styles.label} style={{ marginBottom: '16px' }}>Үнэлгээ</div>                   
                                    <MovieScore score={props.movie.avg_score} size="large" />
                                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                                        {props.movie.avg_score === 0 ? '/Саналын тоо хангалтгүй/' : `Нийт ${props.movie.score_count} санал`}
                                    </div>
                                </Col>
                            </Row>                                                        
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
                            <div className={styles.label}>Найзууд</div>
                            <MovieActivities id={props.movie.id} />
                        </div>
                        <div className={styles.container}>
                            <div className={styles.label}>Сэтгэгдэл</div>
                            <MovieComments id={props.movie.id} />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MovieDetailDesktop