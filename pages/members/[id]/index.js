import { FacebookFilled, GlobalOutlined, InstagramFilled, MediumOutlined, TwitterOutlined, UserAddOutlined, UserDeleteOutlined, YoutubeFilled } from "@ant-design/icons"
import { Grid, Row, Col, Typography, Space, Avatar, Button, Tabs, message, Popconfirm } from "antd"
import axios from "axios"
import { useRouter } from "next/router"
import useSWR from "swr"
import api from "../../../api"
import Loading from "../../../components/Loading"
import { useSession } from "next-auth/react"
import { useState } from "react"
import MemberMovie from "../../../components/Member/Detail/MemberMovie"
import styles from '../../../styles/Member/MemberDetail.module.css'
import MemberDetailMobile from "../../../components/Member/Detail/MemberDetailMobile"

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

    function isFollowing (user, member) {        
        if (user.following.filter(x => x.id === member.id).length > 0) {
            return true
        }
        return false
    }

    function handleFollow (member) {
        axios({
            method: 'PUT',
            url: `${api.userdetail}/${session.id}/`,
            data: {
                member: member.id,
                follow: true
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${session.token}`
            }
        })
        .then(res => {            
            setUser(res.data)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Дахин оролдоно уу.")
        })
    }

    return (
        <div>
            { member ? (
                screens.lg ? (
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
                                    { user ? (
                                        user.id === member.id ? (
                                            <></>
                                        ) : isFollowing(user, member) ? (
                                            <Popconfirm title="Дагахаа болих уу?" onConfirm={() => handleFollow(member)} okText="Тийм" cancelText="Үгүй">
                                                <Button danger size='small' type='primary' icon={<UserDeleteOutlined />}>Дагаж байгаа</Button>
                                            </Popconfirm>
                                        ) : (
                                            <Button size='small' type='primary' icon={<UserAddOutlined />} onClick={() => handleFollow(member)}>Дагах</Button>
                                        )                                    
                                    ) : (
                                        <Button href="/auth/signin" size='small' type='primary' icon={<UserAddOutlined />}>Дагах</Button>
                                    )}                                
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
                                        <Typography.Title level={4} style={{ margin: 0 }}>{member.followers.length}</Typography.Title>
                                    </Col>
                                    <Col span={8}>
                                        <Typography.Text style={{ margin: 0, fontWeight: 'bold' }}>Дагаж буй:</Typography.Text>
                                        <Typography.Title level={4} style={{ margin: 0 }}>{member.following.length}</Typography.Title>
                                    </Col>                                
                                </Row>                                                           
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={{ background: '#fff', padding: '16px', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                                <Tabs defaultActiveKey="1">                                
                                    <Tabs.TabPane tab="Кино" key="1">
                                        <MemberMovie member={member} user={user} token={session ? session.token : undefined} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Цуврал" key="2">
                                        Profile
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Нийтлэл" key="3">
                                        Profile
                                    </Tabs.TabPane>
                                </Tabs>
                            </div>
                        </Col>                    
                    </Row>
                ) : (
                    <MemberDetailMobile 
                        member={member}
                    />
                )               
            ) : (
                <Loading />
            )}            
        </div>
    )
}

export default MemberDetail