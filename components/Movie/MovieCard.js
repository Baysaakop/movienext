import { Button, Drawer, Rate, Space, Tooltip } from "antd"
import Image from "next/image"
import Link from "next/link"
import MovieScore from "./MovieScore"
import { PlusOutlined } from '@ant-design/icons'
import { useState } from "react"

import styles from '../../styles/Movie.module.css'
import MovieLikeButton from "./MovieLikeButton"
import MovieWatchedButton from "./MovieWatchedButton"
import MovieWatchlistButton from "./MovieWatchlistButton"
import MovieRateButton from "./MovieRateButton"
import dayjs from "dayjs"

const MovieCard = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false)    
    const [action, setAction] = useState(false)

    function openDrawer () {        
        setDrawerOpen(true)
    }   

    function closeDrawer () {        
        setDrawerOpen(false)
    }   

    function onBlur () {
        if (action == false) {
            setDrawerOpen(false)
        } else {
            setAction(false)
        }
    }

    function onMouseDown () {
        setAction(true)
    }

    return (        
        <Tooltip title={`${props.movie.title} (${props.movie.releasedate ? dayjs(props.movie.releasedate).year() : ''})`}>
            <div className={styles.movieCard}>
                <Link href={`/movies/${props.movie.id}`} target="_blank">                    
                    <a>
                        <Image 
                            alt={props.movie.title}
                            src={props.movie.poster !== null ? props.movie.poster : "/blank.png"}
                            width={300}
                            height={450}
                            layout="responsive"
                        />
                    </a>    
                </Link>
                { props.movie.poster === null ?          
                    <Link href={`/movies/${props.movie.id}`} target="_blank">                    
                        <a>
                            <div className={styles.titleContainer}>
                                <div className={styles.title}>
                                    {`${props.movie.title} (${props.movie.releasedate ? dayjs(props.movie.releasedate).year() : ''})`}
                                </div>
                            </div>
                        </a>           
                    </Link>
                :
                    <></>
                }
                <div className={styles.score}>
                    <MovieScore score={props.movie.avg_score} size="small" />
                </div>
                <div className={styles.action}>
                    <Button 
                        className={styles.btnMore} 
                        size="middle" 
                        type="text" 
                        icon={<PlusOutlined />} 
                        onClick={openDrawer} 
                    />                
                </div>        
                <Drawer                                
                    placement="right"
                    closable={false}
                    onBlur={onBlur}
                    onClose={closeDrawer}
                    visible={drawerOpen}
                    getContainer={false}
                    width={60}                
                    style={{ position: 'absolute' }}
                >
                    <div className={styles.drawer}> 
                        <div onMouseDown={onMouseDown}>
                            <MovieWatchedButton onBlur={onBlur} movie={props.movie} user={props.user} token={props.token} placement="right" />   
                        </div>               
                        <div onMouseDown={onMouseDown}>
                            <MovieLikeButton onBlur={onBlur} movie={props.movie} user={props.user} token={props.token} placement="right" />
                        </div>                                              
                        <div onMouseDown={onMouseDown}>
                            <MovieWatchlistButton onBlur={onBlur} movie={props.movie} user={props.user} token={props.token} placement="right" />
                        </div>
                        <div onMouseDown={onMouseDown}>
                            <MovieRateButton onMouseDown={onMouseDown} movie={props.movie} user={props.user} token={props.token} placement="right" />    
                        </div>                                                                                           
                    </div>
                </Drawer> 
            </div>   
            { props.score ? (
                <div>
                    <Rate allowHalf disabled count={5} defaultValue={props.score / 2} style={{ fontSize: '12px', color: '#3c3c3c' }} />
                </div>
            ) : (
                <></>
            )}
        </Tooltip>
    )
}

export default MovieCard