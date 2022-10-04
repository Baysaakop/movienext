import { FacebookFilled, GlobalOutlined, InstagramFilled, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from "@ant-design/icons"
import { Row, Col, Typography, Space, Avatar, Button, Tabs, List } from "antd"
import MovieScore from '../../../components/Movie/MovieScore'
import axios from "axios"
import { useState, useEffect } from 'react'
import MovieCard from "../../../components/Movie/MovieCard"
import { useRouter } from "next/router"
import useSWR from "swr"
import api from "../../../api"
import Loading from "../../../components/Loading"

const fetcher = url => axios.get(url).then(res => res.data)

const MemberDetail = () => {

    const router = useRouter()
    const { id } = router.query 

    const { data: member } = useSWR(`${api.userdetail}/${id}`, fetcher);    

    return (
        <div>
            { member ? (
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
                                        dataSource={[]}
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
                                        dataSource={[]}
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
                            <Space size={16} style={{ marginBottom: '16px' }}>
                                {member.avatar ? 
                                    <Avatar size={50} src={member.avatar} />
                                :
                                    <Avatar size={50} style={{ background: '#28202f' }}>
                                        {member.username.charAt(0).toUpperCase()}
                                    </Avatar>                         
                                }
                                <Typography.Title level={4} style={{ margin: 0 }}>{member.username}</Typography.Title>                            
                            </Space>
                            <p>{member.biography}</p>       
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<GlobalOutlined />} />                     
                                <Button type="link">Website</Button>
                            </Space>
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<FacebookFilled />} />                     
                                <Button type="link">Facebook</Button>
                            </Space>
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<InstagramFilled />} />                     
                                <Button type="link">Instagram</Button>
                            </Space>
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<YoutubeFilled />} />                     
                                <Button type="link">Youtube</Button>
                            </Space>
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<TwitterOutlined />} />                     
                                <Button type="link">Twitter</Button>
                            </Space>
                            <Space size={8} style={{ display: 'flex', marginBottom: '8px' }}>
                                <Button type="ghost" icon={<MediumOutlined />} />                     
                                <Button type="link">Medium</Button>
                            </Space>                   
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', margin: '16px 0' }}>
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
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default MemberDetail