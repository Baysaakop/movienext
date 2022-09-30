import { CommentOutlined, EyeOutlined, FacebookFilled, InstagramFilled, LikeOutlined, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from '@ant-design/icons'
import { Avatar, Col, Row, Typography, Card, Divider, Space, Button, Statistic, Tag } from 'antd'
import Link from 'next/link'
import ArticleComments from '../../../components/Article/ArticleComments'
import styles from '../../../styles/Article.module.css'
import { useRouter } from "next/router";
import useSWR from 'swr';
import axios from "axios"
import api from "../../../api";
import Loading from "../../../components/Loading";
import dayjs from 'dayjs'

const fetcher = url => axios.get(url).then(res => res.data)

const ArticleDetail = () => {

    const router = useRouter()
    const { id } = router.query 

    const { data: article } = useSWR(`${api.articles}/${id}`, fetcher);    

    return (
        <div className={styles.articleDetail}>
            { article ? (
                <Row gutter={[16, 16]}> 
                    <Col xs={24} sm={24} md={16}>
                        <Card             
                            className={styles.articleBody}                   
                            cover={
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                    <img
                                        alt={article.title} 
                                        src={article.cover}                                                 
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                    />                               
                                </div>        
                            }
                            actions={[                                
                                <Button key={0} icon={<LikeOutlined />} size='default' type='text'> {article.like_count}</Button>,
                                <Button key={1} icon={<CommentOutlined />} size='default' type='text'> {article.comment_count}</Button>,                               
                                <Button key={2} icon={<EyeOutlined />} size='default' type='text'> {article.view_count}</Button>,
                            ]}
                        >
                            <Typography.Title level={3}>{article.title}</Typography.Title>
                            { article.categories.map(cat => (
                                <Tag key={cat.id} color="geekblue">{cat.name}</Tag>
                            )) }
                            <div style={{ fontSize: '14px', marginTop: '16px' }} dangerouslySetInnerHTML={{ __html: article.content }}></div>    
                            <p style={{ fontStyle: 'italic', textAlign: 'end' }}>
                                Нийтлэгдсэн: {dayjs(article.created_at).format("YYYY оны MM сарын DD")}
                            </p>
                        </Card>
                        <ArticleComments />
                    </Col>
                    <Col xs={24} sm={24} md={8}>
                        <div className={styles.container}>
                            <Typography.Title level={5}>Нийтлэлч:</Typography.Title>
                            <Space size={16} style={{ marginBottom: '16px' }}>
                                <Link href={`/users/${article.author.id}`}>
                                    <a>
                                        <Avatar src={article.author.avatar} size={50} />
                                    </a>
                                </Link>
                                <Link href={`/users/${article.author.id}`}>
                                    <a>
                                        <Typography.Title level={4} style={{ margin: 0 }}>{article.author.username}</Typography.Title>
                                    </a>
                                </Link>
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
                            <Button block type='primary' icon={<UserAddOutlined />}>Дагах</Button>
                        </div>
                        <div className={styles.container}>
                            <Typography.Title level={5}>Санал болгох:</Typography.Title>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default ArticleDetail