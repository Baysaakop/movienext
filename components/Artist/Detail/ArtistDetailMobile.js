import { Row, Col, Typography } from 'antd'
import Image from 'next/image'
import Filmography from '../Filmography'
import styles from '../../../styles/Artist/ArtistDetail.module.css'
import moment from 'moment'

const ArtistDetailMobile = (props) => {
    return (
        <div className={styles.mobile}>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Image className={styles.profilePic} src={props.artist.image !== null ? props.artist.image : "/blank.png"} width={200} height={300} layout='responsive' />
                </Col>
                <Col span={16}>
                    <div className={styles.container}>                            
                        <div className={styles.title}>{props.artist.name}</div>
                        <div className={styles.label}>Мэргэжил</div>
                        <div className={styles.value}>
                            {props.artist.occupations.map(occupation => (
                                <span key={occupation.id}>{occupation.name} </span>
                            ))}    
                        </div>       
                        <div className={styles.label}>Төрсөн өдөр</div>
                        <div className={styles.value}>
                            {props.artist.birthdate ? moment(props.artist.birthdate).format("YYYY оны MM сарын DD") : '--Оруулаагүй--'}
                        </div>                                                                        
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.container}>    
                        <div className={styles.label}>Намтар</div>
                        <Typography.Paragraph ellipsis={{ rows: 10, expandable: true, symbol: 'цааш' }}>{props.artist.biography}</Typography.Paragraph>
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

export default ArtistDetailMobile