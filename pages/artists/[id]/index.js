import { FacebookFilled, InstagramFilled, TwitterOutlined } from "@ant-design/icons"
import { Col, Row, Typography, Space, Button, Divider } from "antd"
import useSWR from 'swr';
import axios from "axios"
import api from "../../../api";
import FilmographyCast from "../../../components/Artist/FilmographyCast"
import styles from '../../../styles/Artist.module.css'
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";

const fetcher = url => axios.get(url).then(res => res.data)

const ArtistDetail = () => {

    const router = useRouter()
    const { id } = router.query 

    function onBlur() {}

    function onMouseDown() {}

    const { data } = useSWR(`${api.artistdetail}/${id}`, fetcher);    

    return (
        <div className={styles.artistDetail}>
            { data ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <img className={styles.avatar} alt={data.name} src={data.image} />
                        <div className={styles.container}>
                            <Typography.Title level={4}>{data.name}</Typography.Title>
                            <span>{data.biography}</span>
                            <Typography.Title level={5} style={{ marginTop: '24px' }}>Мэргэжил</Typography.Title>
                            {data.occupations.map(occupation => (
                                <span key={occupation.id}>{occupation.name}, </span>
                            ))}
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={18}>
                        <div className={styles.container}>
                            <Typography.Title level={3} style={{ margin: 0 }}>{data.name}</Typography.Title>                                                  
                        </div>
                        <div className={styles.container} style={{ marginTop: '16px' }}>
                            <Typography.Title level={5}>Уран бүтээлүүд (Жүжигчин)</Typography.Title>
                            {/* <FilmographyCast artist={artist.id} /> */}
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