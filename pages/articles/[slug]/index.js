import { CommentOutlined, EyeOutlined, FacebookFilled, InstagramFilled, LikeOutlined, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from '@ant-design/icons'
import { Avatar, Col, Row, Typography, Card, Divider, Space, Button, Statistic, Tag } from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import ArticleComments from '../../../components/Article/ArticleComments'
import styles from '../../../styles/Article.module.css'

import graphcms from '../../../graphql/graphcms'
import getArticle from '../../../graphql/Article/getArticle'
import getArticleSlugs from '../../../graphql/Article/getArticleSlugs'

export async function getStaticPaths() {
    const { articles } = await graphcms.request(getArticleSlugs)
    return {
        paths: articles.map((article) => ({
            params: { slug: article.slug }
        })),
        fallback: false,
    }    
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const data = await graphcms.request(getArticle, {slug});    
    const article = data.article;
    return {
        props: {
            article,
        },
        revalidate: 10,
    };
}

const ArticleDetail = ({ article }) => {
    return (
        <div className={styles.articleDetail}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>
                    <Card             
                        className={styles.articleBody}                   
                        cover={
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                <img
                                    alt={article.title} 
                                    src={article.cover.url}                                                 
                                    style={{ width: 'auto', height: '100%', maxHeight: '500px', objectFit: 'cover' }}
                                />                               
                            </div>        
                        }
                        actions={[
                            <span key="like" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><LikeOutlined /> {214} Таалагдсан</span>,
                            <span key="comment" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><CommentOutlined /> {7} Сэтгэгдэл</span>,
                            <span key="view" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><EyeOutlined /> {2234} Үзсэн</span>,
                        ]}
                    >
                        <Typography.Title level={2}>{article.title}</Typography.Title>
                        { article.tags.map(tag => (
                            <Tag key={tag} color="geekblue">{tag}</Tag>
                        )) }
                        <div style={{ fontSize: '16px', marginTop: '16px' }} dangerouslySetInnerHTML={{ __html: article.content.html }}></div>    
                        <p style={{ fontStyle: 'italic', textAlign: 'end' }}>
                            Нийтлэгдсэн: {article.date}
                        </p>
                    </Card>
                    <ArticleComments />
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Нийтлэлч:</Typography.Title>
                        <Space size={16} style={{ marginBottom: '16px' }}>
                            <Link href={`/users/${article.author.account.id}`}>
                                <a>
                                    <Avatar src={article.author.account.avatar.url} size={50} />
                                </a>
                            </Link>
                            <Link href={`/users/${article.author.account.id}`}>
                                <a>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{article.author.account.username}</Typography.Title>
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
        </div>
    )
}

export default ArticleDetail