import { Row, Col, Spin, Card, Avatar, Typography, Button } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'
import api from '../../api'

const fetcher = url => axios.get(url).then(res => res.data.results)

const HomeArticles = () => {

    function getURL () {
        let url = `${api.articles}/?`
        return url
    }

    const { data: articles } = useSWR(getURL, fetcher);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Title level={4} style={{ borderLeft: '6px solid #000', paddingLeft: '6px' }}> Нийтлэл</Typography.Title>
                <Button size='large' type='link'>Бүгд</Button>
            </div>
            {articles ? (
                <Row gutter={16}> 
                   {articles.slice(0, 3).map(item => 
                    <Col key={item.id} xs={24} sm={24} md={8}>
                        <Link href={`/articles/${item.id}`}>
                            <a>
                                <Card
                                    hoverable
                                    cover={<img alt={item.title} src={item.cover} style={{ width: '100%', height: 'auto' }} /> }
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={item.author.avatar} size={40} />}
                                        title={<Typography.Title level={5} style={{ marginBottom: 0 }}>{item.author.username}</Typography.Title>} 
                                        description={`${dayjs(item.created_at).format("YYYY оны MM сарын DD")}`}
                                    />
                                    <Typography.Title level={5} style={{ marginTop: '8px' }}>{item.title}</Typography.Title>
                                    <Typography.Paragraph ellipsis={{ rows: 4 }} style={{ margin: '8px 0' }}>
                                        <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: item.content }}></div>                                                    
                                    </Typography.Paragraph>                
                                    <Button block type="link">Дэлгэрэнгүй...</Button>
                                </Card>           
                            </a>
                        </Link>             
                    </Col>
                   )}                                        
                </Row>
            ) : (
                <Spin />
            )}
        </div>
    )
}

export default HomeArticles