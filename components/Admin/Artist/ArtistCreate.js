import { Form, Input, Row, Col, Typography, DatePicker, Select, Popconfirm, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../api'
import ImageUpload from '../../ImageUpload'
import dayjs from 'dayjs'
import Router from 'next/router'

const ArtistCreate = ({ token }) => {

    const [form] = Form.useForm()
    const [occupations, setOccupations] = useState([])    
    const [image, setImage] = useState()    

    useEffect(() => {
        getOccupations()
    }, [])

    function getOccupations () {
        axios({
            method: 'GET',
            url: api.occupations
        })
        .then(res => {
            setOccupations(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function onFinish (values) {
        var formData = new FormData()
        formData.append('name', values.name)
        formData.append('token', token)
        if (values.firstname) {
            formData.append('firstname', values.firstname)
        }
        if (values.lastname) {
            formData.append('lastname', values.lastname)
        }
        if (values.birthdate) {
            formData.append('birthdate', dayjs(values.birthdate).format("YYYY-MM-DD"))
        }
        if (values.gender) {
            formData.append('gender', values.gender)
        }
        if (values.biography) {
            formData.append('biography', values.biography)
        } 
        if (values.occupations) {
            formData.append('occupations', values.occupations)
        } 
        if (image) {
            formData.append('image', image)
        }       
        axios({
            method: 'POST',
            url: `${api.artistdetail}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            message.success(`${values.name} уран бүтээлч нэмэгдлээ.`)
            Router.reload()          
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Уран бүтээлч нэмэх</Typography.Title>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="Уран бүтээлчийн нэр" name="name" rules={[{ required: true, message: 'Уран бүтээлчийн нэрийг оруулна уу!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Овог" name="lastname">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Нэр" name="firstname">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Мэргэжил" name="occupations">
                            <Select                                
                                mode='multiple'
                                optionFilterProp='children'
                            >
                               {occupations.map(item => {
                                    return (
                                        <Select.Option key={item.id}>{item.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>               
                    <Col span={8}>
                        <Form.Item label="Төрсөн өдөр" name="birthdate">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="Хүйс" name="gender">
                            <Select>
                                <Select.Option key="m">Эр</Select.Option>
                                <Select.Option key="f">Эм</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Намтар" name="biography">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>                         
                    <Col span={24}>
                        <Form.Item label="Зураг" name="image">                            
                            <ImageUpload onImageSelected={(path) => setImage(path)} height="300px" width="200px" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Popconfirm title="Нэмэх үү?" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                                <Button block size="large" type="primary">
                                    Нэмэх
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ArtistCreate