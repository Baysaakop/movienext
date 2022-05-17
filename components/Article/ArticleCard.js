import { Avatar, Card, Typography } from "antd"
import { CommentOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons"
import Link from "next/link"

import styles from '../../styles/Article.module.css'

const ArticleCard = ({ img, avatar, username, releasedate, title, text, like, comment, view }) => {
    return (
        <div>
            <Card             
                className={styles.articleCard}                   
                cover={
                    <Link href="/articles/1">
                        <a>
                            <img alt="example" src={img} style={{ width: '100%', height: 'auto', objectFit: 'fill', borderRadius: '4px 4px 0 0' }} />
                        </a>
                    </Link>
                }
                actions={[
                    <span key="like" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><LikeOutlined /> {like} Таалагдсан</span>,
                    <span key="comment" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><CommentOutlined /> {comment} Сэтгэгдэл</span>,
                    <span key="view" style={{ color: 'rgba(0, 0, 0, 0.75)' }}><EyeOutlined /> {view} Үзсэн</span>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar src={avatar} size="large" />}
                    title={<Typography.Title level={5} style={{ margin: 0 }}>{username}</Typography.Title>}
                    description={`Нийтлэгдсэн: ${releasedate}`}
                />
                <Link href="/articles/1">
                    <a>
                        <Typography.Title level={3} style={{ marginTop: '16px' }}>{title}</Typography.Title>
                    </a>
                </Link>
                <p>{text}</p>
                <Link href="/articles/1">
                    <a>Үргэлжлүүлэн унших...</a>
                </Link>                
            </Card>
        </div>
    )
}

export default ArticleCard