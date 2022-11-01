import { Row, Col, Typography, Space } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import Filmography from '../Filmography'
import styles from '../../../styles/Artist/ArtistDetail.module.css'

const ArtistDetailTablet = (props) => {
    return (
        <div className={styles.tablet}>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Image className={styles.profilePic} src={props.artist.image !== null ? props.artist.image : "/blank.png"} width={200} height={300} layout='responsive' />
                </Col>
                <Col span={18}>
                    <div className={styles.container}>                            
                        <div className={styles.title}>{props.artist.name}</div>
                        <Space size={16} wrap>
                            <div>
                                <div className={styles.label}>Мэргэжил</div>
                                <div className={styles.value}>
                                    {props.artist.occupations.map(occupation => (
                                        <span key={occupation.id}>{occupation.name} </span>
                                    ))}    
                                </div>       
                            </div>
                            <div>
                                <div className={styles.label}>Төрсөн өдөр</div>
                                <div className={styles.value}>
                                    {dayjs(props.artist.birthdate).format("YYYY-MM-DD")}
                                </div>           
                            </div>
                        </Space>         
                        <div className={styles.label}>Намтар</div>
                        <Typography.Paragraph className={styles.biography} ellipsis={{ rows: 6, expandable: true, symbol: 'цааш' }}>{props.artist.biography}</Typography.Paragraph>                                                                            
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.container}>    
                        <div className={styles.label}>Уран бүтээлүүд</div>
                        <Filmography artist={props.artist} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ArtistDetailTablet