import { Card, Divider, List, Typography } from 'antd'
import styles from '../../styles/Movie.module.css'

const data = [
    {
      title: 'Benedict Cumberbatch',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/fBEucxECxGLKVHBznO0qHtCGiMO.jpg',
      role: 'Dr.Strange',
    },
    {
      title: 'Elizabeth Olsen',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/mbMsmQE5CyMVTIGMGCw2XpcPCOc.jpg',
      role: 'Wanda Maximoff',
    },
    {
      title: 'Benedict Wong',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/ukmfsl59Isvn9odgzMWBidA3cmt.jpg',
      role: 'Wong',
    },
    {
      title: 'Xochitl Gomez',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/oo1wzI9zaRWvZOsae43raoPykgb.jpg',
      role: 'America Chavez',
    },
    {
      title: 'Chiwetel Ejiofor',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/kq5DDnqqofoRI0t6ddtRlsJnNPT.jpg',
      role: 'Karl Mordo',
    },
    {
      title: 'Jett Klyne',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/faWOw1XJAc3NNlnlE9yFIIbinQa.jpg',
      role: 'Tommy Maximoff',
    },
    {
      title: 'Julian Hilliard',
      img: 'https://www.themoviedb.org/t/p/w138_and_h175_face/umnRZFm9pQ9xB53PQwUPFOVul4j.jpg',
      role: 'Billy Maximoff',
    },
  ];

const MovieCast = () => {
    return (
        <div className={styles.container}>
            <Typography.Title level={4}>Жүжигчид</Typography.Title>
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

export default MovieCast