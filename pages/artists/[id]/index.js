import { Col, Row, Typography, Space, Button, Divider } from "antd"
import useSWR from 'swr';
import axios from "axios"
import api from "../../../api";
import Filmography from "../../../components/Artist/Filmography"
import styles from '../../../styles/Artist.module.css'
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const fetcher = url => axios.get(url).then(res => res.data)

const ArtistDetail = () => {    
    const [user, setUser] = useState()    
    const router = useRouter()
    const { id } = router.query 

    const { data: artist } = useSWR(`${api.artistdetail}/${id}`, fetcher) 

    const { data: session, status } = useSession()

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    return (
        <div className={styles.artistDetail}>
            { artist ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <img className={styles.avatar} alt={artist.name} src={artist.image !== null ? artist.image : "/blank.png"} />
                        <div className={styles.container}>                            
                            <Typography.Title level={5}>Мэргэжил</Typography.Title>
                            {artist.occupations.map(occupation => (
                                <span key={occupation.id}>{occupation.name} </span>
                            ))}
                            <Typography.Title level={5} style={{ marginTop: '16px' }}>Төрсөн өдөр</Typography.Title>
                            {dayjs(artist.birthdate).format("YYYY-MM-DD")}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <div className={styles.container}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography.Title level={3} style={{ margin: 0 }}>{artist.name}</Typography.Title>                                                                        
                                { user && user.role === 1 ? (
                                    <Link href={`/admin/editartist/${artist.id}`}>
                                        <a>Засах</a>
                                    </Link>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <Divider style={{ margin: '8px 0' }} />                                        
                            <Typography.Title level={5}>Намтар</Typography.Title>
                            <Typography.Paragraph ellipsis={{ rows: 10, expandable: true, symbol: 'цааш' }}>{artist.biography}</Typography.Paragraph>
                        </div>
                        <div className={styles.container} style={{ marginTop: '16px' }}>
                            <Typography.Title level={5}>Уран бүтээлүүд</Typography.Title>
                            <Filmography artist={artist} />
                        </div>
                    </Col>
                </Row>
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default ArtistDetail