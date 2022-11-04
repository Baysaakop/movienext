import { Form, Button, Typography, Input, message } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import api from '../../api'
import Router from 'next/router'
import styles from '../../styles/Settings.module.css'
import ImageUpload from '../ImageUpload'
import Loading from '../Loading'

const SettingsInfo = ({ session }) => {    
    const [form] = Form.useForm()
    const [avatar, setAvatar] = useState()
    const [loading, setLoading] = useState(false)

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
                setLoading(false)
                Router.reload()                                
            }            
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")            
        })
    }
   
    return (
        <div className={styles.container}>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Typography.Title level={4}>Хэрэглэгчийн мэдээлэл</Typography.Title>        
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
                            <ImageUpload image={session.avatar} onImageSelected={(path) => setAvatar(path)} height="128px" width="128px" />     
                        </Form.Item>              
                        <Button block type='primary' onClick={form.submit}>Хадгалах</Button>                    
                    </Form>   
                </div>
            )}    
        </div>
    )            
}

export default SettingsInfo