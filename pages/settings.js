import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Button, Result, Form, Input, Typography, message } from 'antd';
import Loading from '../components/Loading'
import axios from 'axios';
import api from '../api';
import Router from 'next/router'

const Settings = () => {
    const [form] = Form.useForm()
    const { data: session, status } = useSession()

    function onFinish (values) {
        var formData = new FormData()
        if (values.username && values.username !== session.username) {
            formData.append('username', values.username)
        }
        if (values.website && values.website !== session.website) {
            formData.append('website', values.website)
        }
        axios({
            method: 'PUT',
            url: `${api.users}/${session.id}/`,
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
                Router.reload()                                
            }            
        })
        .catch(err => {
            console.log(err)
        })
    }

    if (status === "loading") {
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