import { Grid } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import api from '../../../api'
import styles from '../../../styles/Movie/MovieAction.module.css'
import MovieLikeButton from './MovieLikeButton'
import MovieLogButton from './MovieLogButton'
import MovieRateButton from './MovieRateButton'
import MovieWatchedButton from './MovieWatchedButton'
import MovieWatchlistButton from './MovieWatchlistButton'

const { useBreakpoint } = Grid

const MovieAction = (props) => {
    const screens = useBreakpoint()
    const [log, setLog] = useState()        

    useEffect(() => {
        if (props.session && props.movie && log === undefined) {
            axios({
                method: 'GET',
                url: `${api.movielogs}?user=${props.session.id}&movie=${props.movie.id}`
            })
            .then(res => {                     
                if (res.data.count > 0) {
                    setLog(res.data.results[res.data.count - 1])
                }               
            })
            .catch(err => {            
                console.log(err)
            })
        }        
    }, [props.session, props.movie])    

    function updateLog (data) {
        setLog(data)
    }

    if (props.container === "card") {
        return (
            <div className={styles.card}>
                <div className={styles.action}>
                    <div>
                        <MovieWatchedButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="right" size={screens.xs ? "default" : "large"} />
                    </div>
                    <div>
                        <MovieLikeButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="right" size={screens.xs ? "default" : "large"} />
                    </div>                                 
                    <div>
                        <MovieWatchlistButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="right" size={screens.xs ? "default" : "large"} />
                    </div>
                    <div>
                        <MovieRateButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="right" size={screens.xs ? "default" : "large"} />
                    </div>                        
                </div>
            </div>
        )
    } else {
        return (
            <div className={styles.detail}>
                <div className={styles.action}>
                    <div>
                        <MovieWatchedButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="top" size="large" />
                    </div>
                    <div>
                        <MovieLikeButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="top" size="large" />
                    </div>                                 
                    <div>
                        <MovieWatchlistButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="top" size="large" />
                    </div>
                    <div>
                        <MovieRateButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="top" size="large" />
                    </div>          
                    { screens.lg ? (
                        <></>
                    ) : (
                        <div>
                            <MovieLogButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="top" size="large" shape="circle" block={false} text="" />
                        </div>
                    )}              
                </div>
                { screens.lg ? (
                    <div className={styles.log}>
                        <MovieLogButton movie={props.movie} session={props.session} log={log} updateLog={(data) => updateLog(data)} placement="none" size="default" shape="default" block={true} text="Тэмдэглэх" />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default MovieAction