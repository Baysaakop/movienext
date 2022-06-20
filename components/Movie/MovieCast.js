import { Card, Divider, List, Typography } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from '../../styles/Movie.module.css'

const MovieCast = ({ id }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://movieplusback.herokuapp.com/api/movies/castmembers?film=${id}`
        })
        .then(res => {            
            console.log(res.data.results)
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

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
                    <List.Item key={item.id}>
                        <Link href={`/artists/${item.artist.id}`}>
                            <a>
                                <Card 
                                    hoverable
                                    cover={
                                        <Image
                                            alt={item.artist.name}
                                            src={item.artist.avatar}
                                            width={200}
                                            height={300}
                                            layout="responsive"
                                        />
                                    }
                                    size="small"
                                >
                                    <Card.Meta title={item.artist.name} description={item.role_name} />
                                </Card>
                            </a>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MovieCast