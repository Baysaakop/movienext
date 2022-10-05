import { Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Popconfirm, Row, Button } from 'antd'
import axios from 'axios'
import Router from 'next/router'
import React, { useState } from 'react'
import api from '../../../../api'
import ImageUpload from '../../../ImageUpload'
import dayjs from 'dayjs'

const MovieEditInfo = (props) => {
    const [form] = Form.useForm()
    const [poster, setPoster] = useState()
    const [background, setBackground] = useState()

    function onFinish(values) {        
        var formData = new FormData()    
        if (values.title && values.title !== props.movie.title) {
            formData.append('title', values.title)
        }
        if (values.description && values.description !== props.movie.description) {
            formData.append('description', values.description)
        }
        if (values.releasedate && dayjs(values.releasedate).format("YYYY-MM-DD") !== props.movie.releasedate) {
            formData.append('releasedate', dayjs(values.releasedate).format("YYYY-MM-DD"))
        }
        if (values.duration && values.duration !== props.movie.duration) {
            formData.append('duration', values.duration)
        }
        if (values.trailer && values.trailer !== props.movie.trailer) {
            formData.append('trailer', values.trailer)
        }
        if (values.is_released !== props.movie.is_released) {
            formData.append('is_released', values.is_released)
        }
        if (values.in_theater !== props.movie.in_theater) {
            formData.append('in_theater', values.in_theater)
        }
        if (poster && poster !== props.movie.poster) {
            formData.append('poster', poster)
        }
        if (background && background !== props.movie.background) {
            formData.append('background', background)
        }
        axios({
            method: 'PUT',
            url: `${api.moviedetail}/${props.movie.id}/`,
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
                    title: props.movie.title,                                
                    description: props.movie.description,
                    releasedate: dayjs(props.movie.releasedate),
                    duration: props.movie.duration,
                    trailer: props.movie.trailer,
                    is_released: props.movie.is_released,
                    in_theater: props.movie.in_theater,
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="title" label="Нэр" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>          
                    </Col>
                    <Col span={8}>
                        <Form.Item name="releasedate" label="Нээлт">
                            <DatePicker format={"YYYY-MM-DD"} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item name="duration" label="Хугацаа">
                            <InputNumber />
                        </Form.Item>
                    </Col>       
                    <Col span={24}>
                        <Form.Item name="description" label="Агуулга">
                            <Input.TextArea rows={4} />
                        </Form.Item>   
                    </Col>   
                    <Col span={24}>
                        <Form.Item name="trailer" label="Трейлер">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="is_released" label="Нээлтээ хийсэн" valuePropName="checked">
                            <Checkbox>Тийм</Checkbox> 
                        </Form.Item>
                    </Col>          
                    <Col span={12}>
                        <Form.Item name="in_theater" label="Театрт гарч байгаа" valuePropName="checked">
                            <Checkbox>Тийм</Checkbox> 
                        </Form.Item>
                    </Col>             
                    <Col span={24}>
                        <Form.Item label="Постер" name="poster">                            
                            <ImageUpload image={props.movie.poster} onImageSelected={(path) => setPoster(path)} height="300px" width="200px" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Зураг" name="background">                            
                            <ImageUpload image={props.movie.background} onImageSelected={(path) => setBackground(path)} height="300px" width="600px" />
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

export default MovieEditInfo