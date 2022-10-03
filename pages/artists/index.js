import { Divider, List, Typography, Card, Tooltip } from "antd"
import { useState } from 'react'
import Link from "next/link"
import ArtistFilter from "../../components/Artist/ArtistFilter"
import styles from '../../styles/Artist.module.css'
import useSWR from 'swr';
import axios from "axios"
import api from "../../api"
import Loading from "../../components/Loading"

const fetcher = url => axios.get(url).then(res => res.data)

const ArtistList = () => {
    const [pageIndex, setPageIndex] = useState(1)
    const [search, setSearch] = useState()
    const [occupation, setOccupation] = useState(0)  
    const [order, setOrder] = useState()   

    function onPageChange (pageNum) {
        setPageIndex(pageNum)
    }

    function onSearch (val) {
        setSearch(val)
    }

    function onOccupationSelect (id) {
        setOccupation(id)
    }

    function onOrderSelect (order) {
        setOrder(order)
    }

    function getURL () {
        let url = `${api.artistlist}/?`
        if (search && search !== '') {
            url += `name=${search}&`
        }
        if (occupation && occupation !== 0) {
            url += `occupation=${occupation}&`
        }
        if (order && order !== '') {
            url += `order=${order}&`
        }
        url += `page=${pageIndex}`
        return url
    }

    const { data } = useSWR(getURL, fetcher);


    return (
        <div>
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Уран бүтээлчид</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <ArtistFilter onSearch={onSearch} onOccupationSelect={onOccupationSelect} onOrderSelect={onOrderSelect} />
            { data ? (
                <List 
                    grid={{
                        gutter: 16,
                        xs: 3,
                        sm: 4,
                        md: 6,
                        lg: 6,
                        xl: 6,
                        xxl: 8,        
                    }}
                    pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,                   
                        current: pageIndex,                    
                        pageSize: 48,                    
                        total: data.count,
                        size: 'small',
                        onChange: onPageChange
                    }}
                    dataSource={data.results}                
                    renderItem={artist => (
                        <List.Item key={artist.id}>
                            <Link href={`/artists/${artist.id}`}>
                                <a>                                
                                    <Card 
                                        hoverable
                                        className={styles.artistCard}
                                        cover={<img alt={artist.name} src={artist.image !== null ? artist.image : "/blank.png"} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />}
                                        size="small"                                
                                    >                                    
                                        <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>{artist.name}</Typography.Paragraph>
                                    </Card>               
                                </a>        
                            </Link>
                        </List.Item>
                    )}
                />
            ) : (
                <Loading />
            )}
        </div>
    )
}

// export const getStaticProps = async () => {
//     const res = await fetch(`https://movieplusback.herokuapp.com/api/movies/artists/`);
//     const data = await res.json();

//     return {
//         props: { artists: data.results, total: data.count }
//     }
// }

export default ArtistList