import { Card, List, Tooltip } from 'antd'
import axios from 'axios';
import api from '../../api';
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';

const MovieCrew = ({ id }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.moviecrew}?movie=${id}`
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
                                    <Card.Meta title={item.artist.name} description={item.roles[0].name} />
                                </Card>
                            </Tooltip>
                        </a>
                    </Link>
                </List.Item>
            )}
        />
    )
}

export default MovieCrew