import { Col, Row, Typography, Space, Button, Divider } from "antd"
import useSWR from 'swr';
import axios from "axios"
import api from "../../../api";
import Filmography from "../../../components/Artist/Filmography"
import styles from '../../../styles/Artist.module.css'
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";

const fetcher = url => axios.get(url).then(res => res.data)

const ArtistDetail = () => {

    const router = useRouter()
    const { id } = router.query 

    const { data: artist } = useSWR(`${api.artistdetail}/${id}`, fetcher);    

    return (
        <div className={styles.artistDetail}>
            { artist ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <img className={styles.avatar} alt={artist.name} src={artist.image !== null ? artist.image : "/blank.png"} />
                        <div className={styles.container}>
                            <Typography.Title level={4}>{artist.name}</Typography.Title>
                            <span>{artist.biography}</span>
                            <Typography.Title level={5} style={{ marginTop: '24px' }}>Мэргэжил</Typography.Title>
                            {artist.occupations.map(occupation => (
                                <span key={occupation.id}>{occupation.name}, </span>
                            ))}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <div className={styles.container}>
                            <Typography.Title level={3} style={{ margin: 0 }}>{artist.name}</Typography.Title>                                                  
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