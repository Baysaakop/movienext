import { LikeOutlined, MessageOutlined, EyeOutlined } from "@ant-design/icons"
import { Avatar, Col, Divider, List, Row, Typography, Space } from "antd"
import ArticleCard from "../../components/Article/ArticleCard"
import ArticleFilter from "../../components/Article/ArticleFilter"
import Link from 'next/link'
import React from 'react'

import styles from '../../styles/Article.module.css'

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const data = [
    {
        image: 'https://a.ltrbxd.com/resized/story/image/2/3/7/6/6/9/shard/7555/blob-704-704-0-0-fill.jpg?k=e51d703551',
        title: '10 Best Robert Pattinson Performances',
        date: '2022-5-11',
        text: 'Suspendisse nulla mi, vestibulum id lorem eget, vulputate pharetra enim. Proin aliquam risus vitae nisl bibendum, sit amet porttitor turpis aliquet.',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        username: 'Alexus Ripley',
        like: 213,
        comment: 14,
        view: 2270,
    },
    {
        image: 'https://movieplus.s3.amazonaws.com/articles/5/AFI_Fest_21_Announces_Full_Lineup.jpg',
        title: 'AFI Fest ’21 Announces Full Lineup',
        date: '2022-5-11',
        text: 'Suspendisse nulla mi, vestibulum id lorem eget, vulputate pharetra enim. Proin aliquam risus vitae nisl bibendum, sit amet porttitor turpis aliquet.',
        avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
        username: 'Arline Docia',
        like: 394,
        comment: 25,
        view: 4213,
    },
    {
        image: 'https://a.ltrbxd.com/resized/story/image/4/0/3/7/8/1/8/shard/7537/blob-704-704-0-0-fill.jpg?k=99df312a91',
        title: 'The 2022 Los Angeles Asian Pacific Film Festival Kicks Off!',
        date: '2022-5-8',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ipsum magna, suscipit ac risus non, posuere lobortis nisl. Nullam nec lectus at ipsum aliquam egestas non non enim. Quisque sollicitudin eros a lorem molestie, at feugiat justo molestie. Sed eget orci malesuada, tempus arcu ac, cursus erat.',
        avatar: 'https://www.w3schools.com/w3images/avatar6.png',
        username: 'Leola Quintin',
        like: 213,
        comment: 14,
        view: 2270,
    },
    {
        image: 'https://a.ltrbxd.com/resized/story/image/3/5/2/7/0/1/shard/7569/blob-704-704-0-0-fill.jpg?k=7e0499d972',
        title: 'The Criterion Shelf: Starring Delphine Seyrig',
        date: '2022-5-3',
        text: 'Suspendisse nulla mi, vestibulum id lorem eget, vulputate pharetra enim. Proin aliquam risus vitae nisl bibendum, sit amet porttitor turpis aliquet.',
        avatar: 'https://movieplus.s3.amazonaws.com/users/26/pro.jpg',
        username: 'Chandler Bing',
        like: 123,
        comment: 2,
        view: 3123,
    },
]

const ArticleList = () => {
    return (
        <div className={styles.articleList}>
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Нийтлэл</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>            
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '8px' }}
                        pagination={{
                            pageSize: 3,
                            size: 'small'
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={LikeOutlined} text={item.like} key="list-vertical-star-o" />,
                                    <IconText icon={MessageOutlined} text={item.comment} key="list-vertical-like-o" />,
                                    <IconText icon={EyeOutlined} text={item.view} key="list-vertical-message" />,
                                ]}
                                extra={
                                    <img alt="example" src={item.image} width={180} />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} size={48} />}
                                    title={<a href="/users/1">{item.username}</a>}
                                    description={item.date}
                                />
                                <Link href="/articles/1">
                                    <Typography.Title level={4}>{item.title}</Typography.Title>
                                </Link>
                                {item.text}
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className={styles.container}>
                        <ArticleFilter />
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