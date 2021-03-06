import { Form, Input, Row, Col, Typography, DatePicker, InputNumber, Select, Popconfirm, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../api'
import ImageUpload from '../../ImageUpload'
import dayjs from 'dayjs'
import Router from 'next/router'

const MovieCreate = ({ token }) => {

    const [form] = Form.useForm()
    const [genres, setGenres] = useState([])
    const [productions, setProductions] = useState([])    
    const [poster, setPoster] = useState()
    const [background, setBackground] = useState()

    useEffect(() => {
        getGenres()
        getProductions()        
    }, [])

    function getGenres () {
        axios({
            method: 'GET',
            url: api.genres
        })
        .then(res => {
            setGenres(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getProductions () {
        axios({
            method: 'GET',
            url: api.productions
        })
        .then(res => {
            setProductions(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    function onFinish (values) {
        var formData = new FormData()
        formData.append('title', values.title)
        formData.append('token', token)
        if (values.releasedate) {
            formData.append('releasedate', dayjs(values.releasedate).format("YYYY-MM-DD"))
        }
        if (values.duration) {
            formData.append('duration', values.duration)
        }
        if (values.description) {
            formData.append('description', values.description)
        }
        if (values.trailer) {
            formData.append('trailer', values.trailer)
        }
        if (values.rating) {
            formData.append('rating', values.rating)
        }  
        if (values.genres) {
            formData.append('genres', values.genres)
        } 
        if (values.productions) {
            formData.append('productions', values.productions)
        } 
        if (poster) {
            formData.append('poster', poster)
        } 
        if (background) {
            formData.append('background', background)
        }       
        axios({
            method: 'POST',
            url: `${api.moviedetail}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            message.success(`${values.title} ???????? ??????????????????.`)
            Router.reload()          
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Typography.Title level={4}>???????? ??????????</Typography.Title>
            <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ duration: 90 }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="??????" name="title" rules={[{ required: true, message: '???????????? ???????????? ?????????????? ????!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="??????????" name="releasedate">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label="??????????????" name="duration">
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="??????????????" name="description">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="????????" name="genres">
                            <Select                                
                                mode='multiple'
                                optionFilterProp='children'
                            >
                                {genres.map(item => (
                                   <Select.Option key={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="?????????? ??????????????:" name="rating">
                            <Select                                                            
                                optionFilterProp='children'
                            >                              
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="????????????????" name="productions">
                            <Select                                
                                mode='multiple'
                                optionFilterProp='children'
                            >
                                {productions.map(item => (
                                    <Select.Option key={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="??????????????" name="trailer">
                            <Input />
                        </Form.Item>
                    </Col>                  
                    <Col span={24}>
                        <Form.Item label="????????????" name="poster">                            
                            <ImageUpload onImageSelected={(path) => setPoster(path)} height="300px" width="200px" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="??????????" name="background">                            
                            <ImageUpload onImageSelected={(path) => setBackground(path)} height="400px" width="800px" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Popconfirm title="?????????? ?????" okText="????????" cancelText="????????" onConfirm={form.submit}>
                                <Button block size="large" type="primary">
                                    ??????????
                                </Button>
                            </Popconfirm>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default MovieCreate