import { Divider, List, Typography, Card } from "antd"
import { useState } from 'react'
import Link from "next/link"
import ArtistFilter from "../../components/Artist/ArtistFilter"

import styles from '../../styles/Artist.module.css'

const ArtistList = ({ artists, total }) => {
    console.log(artists)
    const [page, setPage] = useState(1)

    function onPageChange (pageNum) {
        setPage(pageNum)
    }

    return (
        <div>
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Уран бүтээлчид</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <ArtistFilter />
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
                pagination={{
                    hideOnSinglePage: true,
                    showSizeChanger: false,                   
                    current: page,                    
                    pageSize: 24,                    
                    total: total,
                    size: 'small',
                    onChange: onPageChange
                }}
                dataSource={artists}                
                renderItem={artist => (
                    <List.Item key={artist.id}>
                        <Link href={`/artists/${artist.id}`}>
                            <Card 
                                hoverable
                                className={styles.artistCard}
                                cover={<img alt={artist.name} src={artist.avatar} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />}
                                size="small"                                
                            >
                                <span>{artist.name}</span>
                            </Card>                       
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`https://movieplusback.herokuapp.com/api/movies/artists/`);
    const data = await res.json();

    return {
        props: { artists: data.results, total: data.count }
    }
}

export default ArtistList