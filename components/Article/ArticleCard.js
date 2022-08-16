import { LikeOutlined, MessageOutlined, EyeOutlined } from "@ant-design/icons"
import { Avatar, Typography, Space, Card, Tag } from "antd"
import React from 'react'
import Link from 'next/link'
import dayjs from "dayjs"

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ArticleCard = ({ article }) => {
    return (
        <Link href={`/articles/${article.id}/`}>
            <a>
                <Card                                         
                    hoverable                                                            
                    cover={
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <img
                                alt={article.title} 
                                src={article.cover}                                                 
                                style={{ width: 'auto', height: '100%', maxHeight: '400px', objectFit: 'cover' }}
                            />                               
                        </div>           
                    }                                        
                    actions={[                        
                        <IconText icon={LikeOutlined} text={article.like_count} key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text={article.comment_count} key="list-vertical-message-o" />,                                                
                        <IconText icon={EyeOutlined} text={article.view_count} key="list-vertical-eye-o" />,
                    ]}
                >
                    <Card.Meta 
                        avatar={<Avatar src={article.author.avatar} size={44} />}
                        title={<Typography.Title level={5} style={{ marginBottom: 0 }}>{article.author.username}</Typography.Title>} 
                        description={`Нийтлэгдсэн: ${dayjs(article.created_at).format("YYYY оны MM сарын DD")}`}
                    />
                    <Typography.Title level={4} style={{ marginTop: '8px' }}>{article.title}</Typography.Title>
                    { article.categories.map(cat => (
                        <Tag key={cat.id} color="geekblue">{cat.name}</Tag>
                    )) }
                    <Typography.Paragraph ellipsis={{ rows: 4 }} style={{ marginBottom: 0, marginTop: '8px' }}>
                        <div style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: article.content }}></div>                                                    
                    </Typography.Paragraph>                                            
                </Card>         
            </a>
        </Link>
    )
}

export default ArticleCard