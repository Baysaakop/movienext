import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button, Result, Form, Input, Typography, message, Tabs } from 'antd';
import Loading from '../components/Loading'
import axios from 'axios';
import api from '../api';
import Router from 'next/router'
import ImageUpload from '../components/ImageUpload'
import SettingsSocial from '../components/Member/SettingsSocial';

const Settings = () => {
    const [form] = Form.useForm()
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false)
    const { data: session, status } = useSession()

    function onFinish (values) {
        setLoading(true)
        var formData = new FormData()
        if (values.username && values.username !== session.username) {
            formData.append('username', values.username)
        }
        if (values.biography && values.biography !== session.biography) {
            formData.append('biography', values.biography)
        }
        if (avatar && avatar !== session.avatar) {
            formData.append('avatar', avatar)
        }
        axios({
            method: 'PUT',
            url: `${api.userlist}/${session.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${session.token}`
            }
        })
        .then(res => {            
            if (res.status === 200) {
                message.success("Амжилттай.")
                setLoading(false)
                Router.reload()                                
            }            
        })
        .catch(err => {
            console.log(err)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
        })
    }

    if (status === "loading" || loading === true) {
        return (
            <Loading />
        )        
    } else if (status === "authenticated") {
        return (
            <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Хэрэглэгчийн бүртгэл" key="1">
                        <div style={{ textAlign: 'center', width: '400px', padding: '16px', border: '1px solid #c5c5c5', borderRadius: '4px' }}>
                            <Typography.Title level={3}>Хэрэглэгчийн бүртгэл</Typography.Title>
                            <Form 
                                layout="vertical" 
                                form={form} 
                                onFinish={onFinish}
                                initialValues={{
                                    email: session.user.email,
                                    username: session.username,
                                    biography: session.biography
                                }}                        
                            >              
                                <Form.Item name="email" label="И-Мэйл:">
                                    <Input disabled />
                                </Form.Item>          
                                <Form.Item name="username" label="Хэрэглэгчийн нэр:" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>                              
                                <Form.Item name="biography" label="Тайлбар:">
                                    <Input.TextArea />
                                </Form.Item>   
                                <Form.Item name="avatar" label="Зураг:">
                                    <ImageUpload image={session.avatar} onImageSelected={(path) => setAvatar(path)} height="192px" width="192px" />     
                                </Form.Item>              
                                <Button block type='primary' onClick={form.submit}>Хадгалах</Button>                    
                            </Form>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Сошиал медиа" key="2">
                        <SettingsSocial />
                    </Tabs.TabPane>
                </Tabs>                
            </div>
        )
    } else {        
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Энэ хуудсыг үзэхийн тулд эхлээд нэвтрэх шаардлагатай."
                    extra={<Button type="primary" onClick={() => signIn()}>Нэвтрэх</Button>}
                />
            </div>
        )
    }
}

export default Settings