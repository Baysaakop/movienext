import { FacebookFilled, InstagramFilled, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from "@ant-design/icons"
import { Row, Col, Typography, Space, Avatar, Button, Tabs, List } from "antd"
import MovieScore from '../../../components/Movie/MovieScore'
import axios from "axios"
import { useState, useEffect } from 'react'
import MovieCard from "../../../components/Movie/MovieCard"

const UserDetail = () => {

    const [favorite, setFavorite] = useState([]) 

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://movieplusback.herokuapp.com/api/movies/films/',            
        })
        .then(res => {
            setFavorite(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>
                    <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Профайл" key="1">
                                <Typography.Title level={5}>Таалагдсан кинонууд</Typography.Title>
                                <List 
                                    grid={{
                                        gutter: 16,
                                        xs: 2,
                                        sm: 3,
                                        md: 3,
                                        lg: 3,
                                        xl: 3,
                                        xxl: 3,
                                    }}
                                    dataSource={favorite.slice(0, 3)}
                                    renderItem={movie => (
                                        <List.Item key={movie.id}>
                                            <MovieCard movie={movie} />                        
                                        </List.Item>
                                    )}
                                />
                                <Typography.Title level={5}>Сүүлд үзсэн</Typography.Title>
                                <List 
                                    grid={{
                                        gutter: 16,
                                        xs: 2,
                                        sm: 3,
                                        md: 3,
                                        lg: 3,
                                        xl: 3,
                                        xxl: 3,
                                    }}
                                    dataSource={favorite.slice(0, 3)}
                                    renderItem={movie => (
                                        <List.Item key={movie.id}>
                                            <MovieCard movie={movie} />                        
                                        </List.Item>
                                    )}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Кино" key="2">
                                Profile
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Цуврал" key="3">
                                Profile
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Нийтлэл" key="4">
                                Profile
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                        <Typography.Title level={5}>Хэрэглэгч:</Typography.Title>
                        <Space size={16} style={{ marginBottom: '16px' }}>
                            <Avatar src="https://www.w3schools.com/howto/img_avatar.png" size={50} />
                            <Typography.Title level={4} style={{ margin: 0 }}>Alexus Ripley</Typography.Title>                            
                        </Space>
                        <p>Something about biography etc...</p>                                
                        <Button block type='ghost' icon={<FacebookFilled />} style={{ marginBottom: '8px' }}>Facebook</Button>
                        <Button block type='ghost' icon={<InstagramFilled />} style={{ marginBottom: '8px' }}>Instagram</Button>
                        <Button block type='ghost' icon={<TwitterOutlined />} style={{ marginBottom: '8px' }}>Twitter</Button>
                        <Button block type='ghost' icon={<MediumOutlined />} style={{ marginBottom: '8px' }}>Medium</Button>
                        <Button block type='ghost' icon={<YoutubeFilled />} style={{ marginBottom: '8px' }}>Youtube</Button>                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', margin: '8px 0' }}>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагагчид:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>1384</Typography.Title>
                            </div>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагаж буй:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>127</Typography.Title>
                            </div>
                        </div>         
                        <Button block type='primary' icon={<UserAddOutlined />}>Follow</Button>
                    </div>
                    <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px', marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', margin: '8px 0' }}>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Кино:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>116</Typography.Title>
                            </div>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Цуврал:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>23</Typography.Title>
                            </div>
                            <div>
                                <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Нийтлэл:</Typography.Text>
                                <Typography.Title level={4} style={{ margin: 0 }}>38</Typography.Title>
                            </div>
                        </div>         
                    </div>
                    <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px', marginTop: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', margin: '8px 0' }}>
                            <div>
                                <Typography.Text style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Киноны дундаж:</Typography.Text>
                                <MovieScore score={41} size='default' />
                            </div>
                            <div>
                                <Typography.Text style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Цувралын дундаж:</Typography.Text>
                                <MovieScore score={28} size='default' />
                            </div>
                        </div>         
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserDetail