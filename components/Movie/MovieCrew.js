import { Card, Divider, List, Space, Typography } from 'antd'
import Link from 'next/link'
import styles from '../../styles/Movie.module.css'

const data = [
    {
      title: 'Benedict Cumberbatch',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
      role: 'Продюсер',
    },
    {
      title: 'Elizabeth Olsen',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/mbMsmQE5CyMVTIGMGCw2XpcPCOc.jpg',
      role: 'Найруулагч',
    },
    {
      title: 'Benedict Wong',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/ukmfsl59Isvn9odgzMWBidA3cmt.jpg',
      role: 'Кино зохиолч',
    },
    {
      title: 'Xochitl Gomez',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/oo1wzI9zaRWvZOsae43raoPykgb.jpg',
      role: 'Зураглаач',
    },
];

const MovieCrew = () => {
    return (
        <div className={styles.container}>
            <Typography.Title level={4}>Баг бүрэлдэхүүн</Typography.Title>
            <Divider style={{ margin: '8px 0' }} />
            <List 
                grid={{
                    gutter: 16,
                    xs: 3,
                    sm: 3,
                    md: 6,
                    lg: 6,
                    xl: 6,
                    xxl: 6,                    
                }}
                dataSource={data}
                style={{ marginTop: '16px' }}
                renderItem={item => (
                    <List.Item>
                        <Card 
                            hoverable
                            cover={<img alt='example' src={item.img} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />}
                            size="small"
                        >
                            <Card.Meta title={item.title} description={item.role} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MovieCrew