import { Card, List, Tooltip } from 'antd'
import axios from 'axios';
import api from '../../api';
import Link from 'next/link'
import { useEffect, useState } from 'react';

const MovieCast = ({ id }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.moviecast}?movie=${id}`
        })
        .then(res => {            
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    return (            
        <List 
            grid={{
                gutter: 16,
                xs: 3,
                sm: 3,
                md: 3,
                lg: 4,
                xl: 4,
                xxl: 4,                 
            }}
            dataSource={data}
            style={{ marginTop: '16px' }}
            renderItem={item => (
                <List.Item key={item.id}>
                    <Link href={`/artists/${item.artist.id}`}>
                        <a>
                            <Tooltip title={item.artist.name}>
                                <Card 
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.artist.name}
                                            src={item.artist.image}
                                            style={{ width: '100%', height: 'auto' }}                                        
                                        />
                                    }
                                    size="small"
                                >
                                    <Card.Meta title={item.artist.name} description={item.role_name} />
                                </Card>
                            </Tooltip>
                        </a>
                    </Link>
                </List.Item>
            )}
        />
    )
}

export default MovieCast