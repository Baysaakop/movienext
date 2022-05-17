import { FacebookFilled, InstagramFilled, TwitterOutlined } from "@ant-design/icons"
import { Col, Row, Typography, Space, Button, Divider } from "antd"
import axios from "axios"
import FilmographyCast from "../../../components/Artist/FilmographyCast"
import styles from '../../../styles/Artist.module.css'

const ArtistDetail = ({ artist }) => {

    console.log(artist)

    return (
        <div className={styles.artistDetail}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={8} lg={6}>
                    <img className={styles.avatar} alt={artist.name} src={artist.avatar} />
                    <div className={styles.container}>
                        <Typography.Title level={5}>Мэргэжил</Typography.Title>
                        {artist.occupations.map(occupation => (
                            <span key={occupation.id}>{occupation.name}, </span>
                        ))}
                        <Typography.Title level={5} style={{ marginTop: '24px' }}>Төрсөн өдөр</Typography.Title>
                        <span>{artist.birthdate}</span>
                        <Typography.Title level={5} style={{ marginTop: '24px' }}>Сошиал хаяг</Typography.Title>
                        <div className={styles.socialmedia}>
                            <Button className={styles.facebook} type="text" shape="circle" size="large" icon={<FacebookFilled />} />
                            <Button className={styles.instagram} type="text" shape="circle" size="large" icon={<InstagramFilled />} />                            
                            <Button className={styles.twitter} type="text" shape="circle" size="large" icon={<TwitterOutlined />} />
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={16} lg={18}>
                    <div className={styles.container}>
                        <Typography.Title level={3}>{artist.name}</Typography.Title>
                        <Divider style={{ margin: '16px 0' }} />
                        <Typography.Title level={5}>Танилцуулга</Typography.Title>
                        <Typography.Text>{artist.biography ? artist.biography : 'Donec finibus ac nisi in volutpat. Donec nibh neque, mattis in fermentum et, facilisis et magna. Aenean auctor nisl eget ipsum mattis lobortis.'}</Typography.Text>                        
                    </div>
                    <div className={styles.container} style={{ marginTop: '16px' }}>
                        <Typography.Title level={5}>Уран бүтээлүүд (Жүжигчин)</Typography.Title>
                        <FilmographyCast artist={artist.id} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export const getStaticProps = async (context) => {
    const { id } = context.params;
    const res = await axios(`https://movieplusback.herokuapp.com/api/movies/artists/${id}`)
    const artist = res.data;

    return {
        props: { artist }
    }
}

export const getStaticPaths = async () => {
    const res = await axios(`https://movieplusback.herokuapp.com/api/movies/artists/`)
    const artists = res.data.results;

    const ids = artists.map(artist => artist.id);
    const paths = ids.map(id => ({ params: { id: id.toString() } }));

    return {
        paths,
        fallback: false
    }
}

export default ArtistDetail