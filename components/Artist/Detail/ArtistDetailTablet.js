import { Row, Col, Typography, Space, Button } from 'antd'
import Image from 'next/image'
import Filmography from '../Filmography'
import styles from '../../../styles/Artist/ArtistDetail.module.css'
import { EditOutlined } from '@ant-design/icons'
import moment from 'moment'

const ArtistDetailTablet = (props) => {
    return (
        <div className={styles.tablet}>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Image className={styles.profilePic} src={props.artist.image !== null ? props.artist.image : "/blank.png"} width={200} height={300} layout='responsive' />
                </Col>
                <Col span={18}>
                    <div className={styles.container}>                            
                        <div className={styles.title}>
                            <div>{props.artist.name}</div>
                            <div>                                                                
                                {props.session && props.session.role === 1 ? 
                                    <Button href={`/admin/editartist/${props.artist.id}`} type='link' icon={<EditOutlined />}>Засах</Button> : ""
                                }
                            </div>    
                        </div>
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
                                    {props.artist.birthdate ? moment(props.artist.birthdate).format("YYYY оны MM сарын DD") : '--Оруулаагүй--'}
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