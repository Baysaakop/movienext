import { LikeOutlined, MessageOutlined, EyeOutlined } from "@ant-design/icons"
import { Avatar, Col, Divider, List, Row, Typography, Space, Card, Tag } from "antd"
import ArticleFilter from "../../components/Article/ArticleFilter"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../../styles/Article.module.css'
import Image from "next/image"

import graphcms from '../../graphql/graphcms'
import getArticles from '../../graphql/Article/getArticles'
import getArticleCategories from '../../graphql/Article/getArticleCategories'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

export async function getStaticProps() {
    const { articles } = await graphcms.request(getArticles)    
    const { articleCategories } = await graphcms.request(getArticleCategories)

    return {
        props: {
            articles: articles,
            categories: articleCategories,
        },        
        revalidate: 10,
    };
}

const ArticleList = ({ articles, categories }) => {    
    return (
        <div className={styles.articleList}>
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Нийтлэл</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>            
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>                    
                    <List                
                        grid={{
                            gutter: 16,
                            column: 1            
                        }}             
                        pagination={{
                            pageSize: 10,
                            size: 'small'
                        }}
                        dataSource={articles}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Link href={`/articles/${item.slug}`}>
                                    <Card                                         
                                        hoverable                                        
                                        className={styles.articleCard}
                                        cover={
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                                <img
                                                    alt={item.title} 
                                                    src={item.cover.url}                                                 
                                                    style={{ width: 'auto', height: '100%', maxHeight: '400px', objectFit: 'cover' }}
                                                />                               
                                            </div>           
                                        }                                        
                                        actions={[
                                            <IconText icon={LikeOutlined} text={421} key="list-vertical-like-o" />,
                                            <IconText icon={MessageOutlined} text={12} key="list-vertical-message-o" />,
                                            <IconText icon={EyeOutlined} text={3946} key="list-vertical-eye-o" />,
                                        ]}
                                    >
                                        <Card.Meta 
                                            avatar={<Avatar src={item.author.account.avatar.url} size={44} />}
                                            title={<Typography.Title level={5} style={{ marginBottom: 0 }}>{item.author.account.username}</Typography.Title>} 
                                            description={`Нийтлэгдсэн: ${item.date}`}
                                        />
                                        <Typography.Title level={4} style={{ marginTop: '8px' }}>{item.title}</Typography.Title>
                                        { item.tags.map(tag => (
                                            <Tag key={tag} color="geekblue">{tag}</Tag>
                                        )) }
                                        <Typography.Paragraph ellipsis={{ rows: 4 }} style={{ marginBottom: 0, marginTop: '8px' }}>
                                            {item.excerpt}
                                        </Typography.Paragraph>
                                    </Card>                       
                                </Link>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className={styles.container}>
                        <ArticleFilter categories={categories} />
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Онцлох нийтлэл</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Топ нийтлэгчид</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Шинэ кинонууд</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Зар сурталчилгаа</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                </Col>                
            </Row>
        </div>
    )
}

export default ArticleList