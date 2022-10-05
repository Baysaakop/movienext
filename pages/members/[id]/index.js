import { FacebookFilled, GlobalOutlined, InstagramFilled, MediumOutlined, TwitterOutlined, UserAddOutlined, YoutubeFilled } from "@ant-design/icons"
import { Grid, Row, Col, Typography, Space, Avatar, Button, Tabs, List, Divider } from "antd"
import MovieScore from '../../../components/Movie/MovieScore'
import axios from "axios"
import MovieCard from "../../../components/Movie/MovieCard"
import { useRouter } from "next/router"
import useSWR from "swr"
import api from "../../../api"
import Loading from "../../../components/Loading"
import { useSession } from "next-auth/react"
import { useState } from "react"
import MemberMovie from "../../../components/Member/MemberMovie"

const fetcher = url => axios.get(url).then(res => res.data)

const { useBreakpoint } = Grid

const MemberDetail = () => {
    const screens = useBreakpoint()
    const router = useRouter()
    const { id } = router.query 
    const [user, setUser] = useState()

    const { data: member } = useSWR(`${api.userdetail}/${id}`, fetcher);    

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

    function getNumber() {
        if (screens.xxl) {
            return 6
        } else if (screens.xl) {
            return 5
        } else if (screens.lg) {
            return 5
        } else if (screens.md) {
            return 5
        } else if (screens.sm) {
            return 3
        } else {
            return 2
        }
    }

    return (
        <div>
            { member ? (
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12}>
                        <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>                        
                            <Space size={16}>
                                {member.avatar ? 
                                    <Avatar size={50} src={member.avatar} />
                                :
                                    <Avatar size={50} style={{ background: '#28202f' }}>
                                        {member.username.charAt(0).toUpperCase()}
                                    </Avatar>                         
                                }
                                <div>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{member.username}</Typography.Title>                            
                                    <Typography.Text italic>{member.biography}</Typography.Text>
                                </div>
                                <Button size='small' type='primary' icon={<UserAddOutlined />}>Дагах</Button>
                            </Space>      
                            <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                <Button type="ghost" icon={<GlobalOutlined />} />                     
                                <Button type="link" href={member.website}>{member.website}</Button>
                            </Space>
                            { member.facebook ? (
                                <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                    <Button type="ghost" icon={<FacebookFilled />} />                     
                                    <Button type="link" href={member.facebook}>{new URL(member.facebook).pathname}</Button>
                                </Space>
                            ) : <></>}     
                            { member.instagram ? (
                                <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                    <Button type="ghost" icon={<InstagramFilled />} />                     
                                    <Button type="link" href={member.instagram}>{new URL(member.instagram).pathname}</Button>
                                </Space>
                            ) : <></>}        
                            { member.youtube ? (
                                <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                    <Button type="ghost" icon={<YoutubeFilled />} />                     
                                    <Button type="link" href={member.youtube}>{new URL(member.youtube).pathname}</Button>
                                </Space>
                            ) : <></>}       
                            { member.twitter ? (
                                <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                    <Button type="ghost" icon={<TwitterOutlined />} />                     
                                    <Button type="link" href={member.twitter}>{new URL(member.twitter).pathname}</Button>
                                </Space>
                            ) : <></>}  
                            { member.medium ? (
                                <Space size={8} style={{ display: 'flex', marginTop: '8px' }}>
                                    <Button type="ghost" icon={<MediumOutlined />} />                     
                                    <Button type="link" href={member.medium}>{new URL(member.medium).pathname}</Button>
                                </Space>
                            ) : <></>}                      
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                        <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Үзсэн:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{member.movies_watched.length}</Typography.Title>
                                </Col>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Таалагдсан:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{member.movies_like.length}</Typography.Title>
                                </Col>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дараа үзэх:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{member.movies_watchlist.length}</Typography.Title>
                                </Col>
                            </Row>                           
                            <Row gutter={16} style={{ marginTop: '24px' }}>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Үнэлгээ өгсөн:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{member.movies_rated.length}</Typography.Title>
                                </Col>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагагчид:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{79}</Typography.Title>
                                </Col>
                                <Col span={8}>
                                    <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагаж буй:</Typography.Text>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{45}</Typography.Title>
                                </Col>                                
                            </Row>                                                           
                        </div>
                    </Col>
                    <Col span={24}>
                        <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                            <Tabs defaultActiveKey="2">
                                {/* <Tabs.TabPane tab="Профайл" key="1">
                                    <Typography.Title level={5} style={{ margin: 0 }}>Таалагдсан кинонууд</Typography.Title>
                                    <Divider style={{ margin: '4px 0 16px 0' }} />
                                    <List 
                                        grid={{
                                            gutter: 16,   
                                            column: getNumber(),
                                        }}
                                        dataSource={member.movies_like ? member.movies_like.slice(0, getNumber()) : []}
                                        renderItem={movie => (
                                            <List.Item key={movie.id}>                                                
                                                <MovieCard movie={movie} user={user} token={session ? session.token : undefined} />                        
                                            </List.Item>
                                        )}
                                    />
                                    <Typography.Title level={5} style={{ margin: '24px 0 0 0' }}>Сүүлд үзсэн</Typography.Title>
                                    <Divider style={{ margin: '4px 0 16px 0' }} />
                                    <List 
                                        grid={{
                                            gutter: 16,   
                                            column: getNumber(),
                                        }}
                                        dataSource={member.movies_watched ? member.movies_watched.slice(0, getNumber()) : []}
                                        renderItem={movie => (
                                            <List.Item key={movie.id}>
                                                <MovieCard movie={movie} user={user} token={session ? session.token : undefined} />                                        
                                            </List.Item>
                                        )}
                                    />
                                </Tabs.TabPane> */}
                                <Tabs.TabPane tab="Кино" key="2">
                                    <MemberMovie member={member} user={user} token={session ? session.token : undefined} />
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
                </Row>
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default MemberDetail