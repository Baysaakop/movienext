import { CommentOutlined, EyeOutlined, FacebookFilled, InstagramFilled, LikeOutlined, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from '@ant-design/icons'
import { Avatar, Col, Row, Typography, Card, Divider, Space, Button, Statistic } from 'antd'
import Link from 'next/link'
import ArticleComments from '../../../components/Article/ArticleComments'
import styles from '../../../styles/Article.module.css'

const ArticleDetail = () => {
    return (
        <div className={styles.articleDetail}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>
                    <Card             
                        className={styles.articleBody}                   
                        cover={
                            <img alt="example" src="https://a.ltrbxd.com/resized/story/image/2/3/7/6/6/9/shard/7555/blob-704-704-0-0-fill.jpg?k=e51d703551" style={{ width: '100%', height: 'auto', objectFit: 'fill', borderRadius: '4px 4px 0 0' }} />
                        }
                        actions={[
                            <span key="like" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><LikeOutlined /> {214} Таалагдсан</span>,
                            <span key="comment" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><CommentOutlined /> {7} Сэтгэгдэл</span>,
                            <span key="view" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><EyeOutlined /> {2234} Үзсэн</span>,
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://www.w3schools.com/howto/img_avatar.png" size={50} />}
                            title={<Typography.Title level={4} style={{ margin: 0 }}>Alexus Ripley</Typography.Title>}
                            description="Нийтлэгдсэн: 2022 оны 5 сарын 10"
                        />
                        <Typography.Title level={1} style={{ marginTop: '16px' }}>10 Best Robert Pattinson Performances</Typography.Title>
                        <p style={{ fontSize: '16px' }}>
                            With the recent release of Matt Reeves The Batman and Christopher Nolan’s Tenet before that, Robert Pattinson has been at the center of media attention lately. Kick-starting his career with the teen sensation Twilight before developing a taste for indie, Pattinson has proven his ability to tap into various roles and genres. Now that he has done the two most mainstream Hollywood things to do, becoming a superhero and working with Nolan, let’s look at Pattinson’s impressive filmography so far.
                            <br /><br />
                            Here is a list featuring the 10 Best Robert Pattinson Performances:
                            <br />
                            www.highonfilms.com/robert-pattinson-movie-performances/
                        </p>           
                    </Card>
                    <ArticleComments />
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Нийтлэлч:</Typography.Title>
                        <Space size={16} style={{ marginBottom: '16px' }}>
                            <Avatar src="https://www.w3schools.com/howto/img_avatar.png" size={50} />
                            <Typography.Title level={4} style={{ margin: 0 }}>Alexus Ripley</Typography.Title>                            
                        </Space>
                        <p>Something about biography etc...</p>                                
                        <Button block type='ghost' icon={<FacebookFilled />} style={{ marginBottom: '8px' }}>Facebook</Button>
                        <Button block type='ghost' icon={<InstagramFilled />} style={{ marginBottom: '8px' }}>Instagram</Button>
                        <Button block type='ghost' icon={<TwitterOutlined />} style={{ marginBottom: '8px' }}>Twitter</Button>
                        <Button block type='ghost' icon={<MediumOutlined />} style={{ marginBottom: '8px' }}>Medium</Button>
                        <Button block type='ghost' icon={<YoutubeFilled />} style={{ marginBottom: '8px' }}>Youtube</Button>                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', margin: '8px 0' }}>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагагчид:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>1384</Typography.Title>
                            </div>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагаж буй:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>127</Typography.Title>
                            </div>
                        </div>         
                        <Button block type='primary' icon={<UserAddOutlined />}>Follow</Button>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Санал болгох:</Typography.Title>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ArticleDetail