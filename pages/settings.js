import React, { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button, Result, Form, Input, Typography, message } from 'antd';
import Loading from '../components/Loading'
import axios from 'axios';
import api from '../api';
import Router from 'next/router'
import ImageUpload from '../components/ImageUpload'

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
        if (values.website && values.website !== session.website) {
            formData.append('website', values.website)
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
                console.log(res.data)
                message.success("Амжилттай.")
                setLoading(false)
                Router.reload()                                
            }            
        })
        .catch(err => {
            console.log(err)
            message.err("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
            setLoading(false)
        })
    }

    if (status === "loading" || loading === true) {
        return (
            <Loading />
        )        
    } else if (status === "authenticated") {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                <div style={{ textAlign: 'center', width: '400px', padding: '24px', border: '1px solid #c5c5c5', borderRadius: '4px' }}>
                    <Typography.Title level={3}>Хэрэглэгчийн бүртгэл</Typography.Title>
                    <Form 
                        layout="vertical" 
                        form={form} 
                        onFinish={onFinish}
                        initialValues={{
                            email: session.user.email,
                            username: session.username,
                            website: session.website
                        }}                        
                    >              
                        <Form.Item name="email" label="И-Мэйл:">
                            <Input disabled />
                        </Form.Item>          
                        <Form.Item name="username" label="Хэрэглэгчийн нэр:" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>   
                        <Form.Item name="website" label="Сошиал хаяг:">
                            <Input />
                        </Form.Item>             
                        <Form.Item name="avatar" label="Зураг:">
                            <ImageUpload image={session.avatar} onImageSelected={(path) => setAvatar(path)} height="192px" width="192px" />     
                        </Form.Item>              
                        <Button block type='primary' onClick={form.submit}>Хадгалах</Button>                    
                    </Form>
                </div>
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