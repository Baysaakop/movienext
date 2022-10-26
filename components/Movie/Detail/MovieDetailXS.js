import { Row, Col, Typography, Divider, Space } from 'antd'
import Image from 'next/image'
import dayjs from 'dayjs'
import styles from '../../../styles/Movie/MovieDetail.module.css'
import Link from 'next/link'

const MovieDetailXS = (props) => {

    function getReleaseDate (releasedate) {
        if (releasedate === undefined) {
            return 'Тодорхойгүй'
        }
        return dayjs(releasedate).year().toString() + " он"
    }   

    return (
        <div className={styles.xs}> 
            {props.movie.background ? (
                <div className={styles.background}>
                    <Image src={props.movie.background} width={400} height={200} layout='responsive' />                                        
                    <div className={styles.mask}></div>
                </div>
            ) : (
                <></>
            )}
            <div className={styles.info}>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Image src={props.movie.poster !== null ? props.movie.poster : "/blank.png"} width={200} height={300} layout='responsive' />
                    </Col>
                    <Col span={16}>
                        <div className={styles.container}>
                            <div className={styles.title}>
                                {props.movie.title}                                                                      
                            </div>                                                   
                            <Divider className={styles.divider} />
                            <Space size={[16, 8]} wrap>
                                <div>{getReleaseDate(props.movie.releasedate)}</div>
                                <div>{props.movie.duration} мин</div>
                            </Space>
                            <div className={styles.bottom}>
                                <div className={styles.label}>Найруулагч</div>
                                <div className={styles.value}>
                                    {props.director.map(item => (
                                        <Link key={item.artist.id} href={`/artists/${item.artist.id}`}>
                                            <a target="_blank">{item.artist.name} </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>         
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MovieDetailXS