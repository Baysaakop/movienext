import { Button, Drawer, Rate, Tooltip } from "antd"
import Image from "next/image"
import Link from "next/link"
import MovieScore from "./MovieScore"
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import moment from "moment"
import styles from '../../styles/Movie/MovieList.module.css'
import MovieAction from "./Action/MovieAction"

const MovieCard = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false)    

    useEffect(() => {
        if (props.openCard && props.openCard === props.movie.id) {
            setDrawerOpen(true)
        } else {
            setDrawerOpen(false)
        }
    }, [props.openCard])

    function openDrawer () {        
        props.setOpenCard(props.movie.id)
    }   

    function closeDrawer () {        
        props.setOpenCard(undefined)
    }   

    return (        
        <div>        
            <div className={styles.movieCard}>
                <Link href={`/movies/${props.movie.id}`} target="_blank">                    
                    <a>
                        <Tooltip title={`${props.movie.title} (${props.movie.releasedate ? moment(props.movie.releasedate).year() : ''})`}>
                            <Image 
                                alt={props.movie.title}
                                src={props.movie.poster !== null ? props.movie.poster : "/blank.png"}
                                width={300}
                                height={450}
                                layout="responsive"
                            />
                        </Tooltip>
                    </a>    
                </Link>
                { props.movie.poster === null ?          
                    <Link href={`/movies/${props.movie.id}`} target="_blank">                    
                        <a>
                            <div className={styles.titleContainer}>
                                <div className={styles.title}>
                                    {`${props.movie.title} (${props.movie.releasedate ? moment(props.movie.releasedate).year() : ''})`}
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
                    onClose={closeDrawer}
                    visible={drawerOpen}
                    getContainer={false}
                    width={60}                
                    style={{ position: 'absolute' }}
                >
                    <MovieAction movie={props.movie} session={props.session} container="card" />
                </Drawer> 
            </div>   
            { props.score && parseInt(props.score) > 0 ? (
                <div>
                    <Rate allowHalf disabled count={5} defaultValue={props.score / 2} style={{ fontSize: '12px', color: '#3c3c3c' }} />
                </div>
            ) : (
                <></>
            )}        
        </div>
    )
}

export default MovieCard