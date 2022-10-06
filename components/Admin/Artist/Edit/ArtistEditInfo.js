import { Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Popconfirm, Row, Button } from 'antd'
import axios from 'axios'
import Router from 'next/router'
import React, { useState } from 'react'
import api from '../../../../api'
import ImageUpload from '../../../ImageUpload'
import dayjs from 'dayjs'

const ArtistEditInfo = (props) => {
    const [form] = Form.useForm()
    const [image, setImage] = useState()

    function onFinish(values) {        
        var formData = new FormData()    
        if (values.name && values.name !== props.artist.name) {
            formData.append('name', values.name)
        }
        if (values.firstname && values.firstname !== props.artist.firstname) {
            formData.append('firstname', values.firstname)
        }
        if (values.lastname && values.lastname !== props.artist.lastname) {
            formData.append('lastname', values.lastname)
        }
        if (values.biography && values.biography !== props.artist.biography) {
            formData.append('biography', values.biography)
        }
        if (values.birthdate && dayjs(values.birthdate).format("YYYY-MM-DD") !== props.artist.birthdate) {
            formData.append('birthdate', dayjs(values.birthdate).format("YYYY-MM-DD"))
        }
        if (values.gender && values.gender !== props.artist.gender) {
            formData.append('gender', values.gender)
        }        
        if (image && image !== props.artist.image) {
            formData.append('image', image)
        }
        axios({
            method: 'PUT',
            url: `${api.artistdetail}/${props.artist.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`
            }
        })
        .then(res => {
            message.success(`Амжилттай хадгалагдлаа.`)
            Router.reload()          
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
                initialValues={{
                    name: props.artist.name,                  
                    firstname: props.artist.firstname,                  
                    lastname: props.artist.lastname,                                
                    biography: props.artist.biography,
                    birthdate: dayjs(props.artist.birthdate),
                    gender: props.artist.gender,
                }}
            >
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="name" label="О.Нэр" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>          
                    </Col>
                    <Col span={8}>
                        <Form.Item name="lastname" label="Овог" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>          
                    </Col>
                    <Col span={8}>
                        <Form.Item name="firstname" label="Нэр" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>          
                    </Col>                    
                    <Col span={8}>
                        <Form.Item name="birthdate" label="Төрсөн өдөр">
                            <DatePicker format={"YYYY-MM-DD"} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="gender" label="Хүйс">
                            <Input />
                        </Form.Item>
                    </Col>       
                    <Col span={24}>
                        <Form.Item name="biography" label="Намтар">
                            <Input.TextArea rows={4} />
                        </Form.Item>   
                    </Col>                       
                    <Col span={24}>
                        <Form.Item name="image" label="Зураг">                            
                            <ImageUpload image={props.artist.image} onImageSelected={(path) => setImage(path)} height="300px" width="200px" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Popconfirm title="Хадгалах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                                <Button block type="primary">
                                    Хадгалах
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </Col>                                                         
                </Row>
            </Form>
        </div>
    )
}

export default ArtistEditInfo