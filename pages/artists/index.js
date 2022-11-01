import { Divider, List, Typography, Card, Tooltip, Result, Button } from "antd"
import Link from "next/link"
import Image from "next/image";
import ArtistFilter from "../../components/Artist/ArtistFilter"
import useSWR from 'swr';
import axios from "axios"
import api from "../../api"
import Loading from "../../components/Loading"
import { useRouter } from "next/router"
import styles from '../../styles/Artist/ArtistList.module.css'

const fetcher = url => axios.get(url).then(res => res.data)

const ArtistList = () => {
    const router = useRouter()
    const {search, occupation, order, page} = router.query

    const { data: artists, error } = useSWR(getURL, fetcher);

    function onPageChange (pageNum) {        
        router.push({
            pathname: '/artists',
            query: { ...router.query, page: pageNum }
        })
    }

    function onSearch (val) {
        router.push({
            pathname: '/artists',
            query: { ...router.query, search: val, page: 1 }
        })
    }

    function onOccupationSelect (id) {
        router.push({
            pathname: '/artists',
            query: { ...router.query, occupation: id, page: 1 }
        })
    }


    function onOrderSelect (order) {
        router.push({
            pathname: '/artists',
            query: { ...router.query, order: order, page: 1 }
        })
    }

    function getURL () {                
        let url = `${api.artistlist}/?`
        if (search && search !== '') {
            url += `search=${search}&`
        }
        if (occupation) {
            if (!isNaN(parseInt(occupation)) && occupation !== '0') {
                url += `occupation=${occupation}&`                
            }
        }        
        if (order && order !== '') {
            url += `order=${order}&`
        }
        if (page) {
            if (isNaN(parseInt(page))) {
                message.error("URL алдаатай байна. Шалгаад дахин оролдоно уу.")
            } else {
                url += `page=${page}`
            }
        }
        return url
    }

    return (
        <div className={styles.artistList}>
            <div>
                <Typography.Title level={4} style={{ margin: 0 }}>Уран бүтээлчид</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            { error ? (
                <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                    <Result
                        status="404"
                        title="Хуудас олдсонгүй."
                        subTitle="Хайлтын утганд таарах хуудас олдсонгүй. Та доорх товчийг дарж уг хуудсыг дахин ачааллана уу."
                        extra={<Button type='primary' href='/artists'>Refresh</Button>}
                    />
                </div>
            ) : (
                artists ? (
                    <div>
                        <ArtistFilter 
                            search={search ? search : ''}
                            occupation={(occupation && !isNaN(parseInt(occupation.toString()) && occupation.toString() !== '0') ? parseInt(occupation.toString()) : 0)}
                            order={(order && order !== '') ? order : '-created_at'} 
                            onSearch={onSearch} 
                            onOccupationSelect={onOccupationSelect} 
                            onOrderSelect={onOrderSelect} 
                        />
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
                                current: page ? parseInt(page) : 1,         
                                pageSize: 48,                    
                                total: artists.count,
                                size: 'small',
                                onChange: onPageChange
                            }}
                            dataSource={artists.results}                
                            renderItem={artist => (
                                <List.Item key={artist.id}>
                                    <Link href={`/artists/${artist.id}`}>
                                        <a>                                
                                            <Card 
                                                hoverable
                                                className={styles.artistCard}
                                                cover={
                                                    <Tooltip title={artist.name}>
                                                        <Image
                                                            alt={artist.name}
                                                            src={artist.image !== null ? artist.image : "/blank.png"}
                                                            width={300}
                                                            height={450}
                                                            layout="responsive"
                                                        />
                                                    </Tooltip>
                                                }
                                                size="small"                                
                                            >                                    
                                                <Typography.Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>{artist.name}</Typography.Paragraph>
                                            </Card>               
                                        </a>        
                                    </Link>
                                </List.Item>
                            )}
                        />
                    </div>
                ) : (
                    <Loading /> 
                )
            )}
        </div>
    )
}

export default ArtistList