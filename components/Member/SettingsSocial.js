import { Form, Button, Result, Typography, Input, message } from 'antd'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useState } from 'react'
import api from '../../api'
import { FacebookFilled, GlobalOutlined, InstagramOutlined, MediumOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import Router from 'next/router'

const SettingsSocial = () => {
    const [form] = Form.useForm()
    const [user, setUser] = useState()
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

    function onFinish(values) {
        var formData = new FormData()
        if (values.website && values.website !== user.website) {
            formData.append('username', values.username)
        }
        if (values.facebook && values.facebook !== user.facebook) {
            formData.append('facebook', values.facebook)
        }
        if (values.instagram && values.instagram !== user.instagram) {
            formData.append('instagram', values.instagram)
        }
        if (values.youtube && values.youtube !== user.youtube) {
            formData.append('youtube', values.youtube)
        }
        if (values.twitter && values.twitter !== user.twitter) {
            formData.append('twitter', values.twitter)
        }
        if (values.medium && values.medium !== user.medium) {
            formData.append('medium', values.medium)
        }
        axios({
            method: 'PUT',
            url: `${api.userlist}/${user.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${session.token}`
            }
        })
        .then(res => {            
            if (res.status === 200) {
                message.success("Амжилттай.")
                Router.reload()                                
            }            
        })
        .catch(err => {
            console.log(err)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")
        })
    }

   if (user) {
        return (
            <div style={{ textAlign: 'center', width: '400px', padding: '16px', border: '1px solid #c5c5c5', borderRadius: '4px' }}>
                <Typography.Title level={3}>Сошиал хаягууд</Typography.Title>        
                <Form 
                    layout="vertical" 
                    form={form} 
                    onFinish={onFinish}
                    initialValues={{
                        website: user.website,
                        facebook: user.facebook,
                        instagram: user.instagram,
                        youtube: user.youtube,
                        twitter: user.twitter,
                        medium: user.medium,
                    }}                        
                >              
                    <Form.Item name="website" label="Сошиал хаяг:">
                        <Input addonBefore={<GlobalOutlined />} />
                    </Form.Item> 
                    <Form.Item name="facebook" label="Facebook хаяг:">
                        <Input addonBefore={<FacebookFilled />} />
                    </Form.Item>           
                    <Form.Item name="instagram" label="Instagram хаяг:">
                        <Input addonBefore={<InstagramOutlined />} />
                    </Form.Item> 
                    <Form.Item name="youtube" label="YouTube хаяг:">
                        <Input addonBefore={<YoutubeFilled />} />
                    </Form.Item> 
                    <Form.Item name="twitter" label="Twitter хаяг:">
                        <Input addonBefore={<TwitterOutlined />} />
                    </Form.Item> 
                    <Form.Item name="medium" label="Medium хаяг:">
                        <Input addonBefore={<MediumOutlined />} />
                    </Form.Item>            
                    <Button block type='primary' onClick={form.submit}>Хадгалах</Button>                    
                </Form>        
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

export default SettingsSocial