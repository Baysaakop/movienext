import { Form, Button, Typography, Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import { FacebookFilled, GlobalOutlined, InstagramOutlined, MediumOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import Router from 'next/router'
import styles from '../../styles/Settings.module.css'
import Loading from '../Loading'

const SettingsSocial = ({ session }) => {
    const [form] = Form.useForm()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
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
    }, [session])  

    function onFinish(values) {
        console.log(values)
        setLoading(true)
        var formData = new FormData()
        if (values.website != null && values.website !== user.website) {
            formData.append('username', values.username)
        }
        if (values.facebook != null && values.facebook !== user.facebook) {
            formData.append('facebook', values.facebook)
        }
        if (values.instagram != null && values.instagram !== user.instagram) {
            formData.append('instagram', values.instagram)
        }
        if (values.youtube != null && values.youtube !== user.youtube) {
            formData.append('youtube', values.youtube)
        }
        if (values.twitter != null && values.twitter !== user.twitter) {
            formData.append('twitter', values.twitter)
        }
        if (values.medium != null && values.medium !== user.medium) {
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

   if (user && loading === false) {
        return (
            <div className={styles.container}>
                <Typography.Title level={4}>Сошиал хаягууд</Typography.Title>        
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
            <Loading />
        )
    }
}

export default SettingsSocial