import { Form, Input, Row, Col, Typography, DatePicker, InputNumber, Select, Popconfirm, Button, message, Divider, Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../api'
import ImageUpload from '../../ImageUpload'
import dayjs from 'dayjs'
import Router from 'next/router'

const { Search } = Input

const MovieUpdate = ({ token }) => {

    const [form] = Form.useForm()
    const [genres, setGenres] = useState()
    const [productions, setProductions] = useState()
    const [poster, setPoster] = useState()
    const [background, setBackground] = useState()

    const [movies, setMovies] = useState([])
    const [selection, setSelection] = useState()

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
        if (values.title) {
            formData.append('title', values.title)
        }
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
            method: 'PUT',
            url: `${api.moviedetail}/${selection}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`
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

    
    function onDelete() {
        axios({
            method: 'DELETE',
            url: `${api.moviedetail}/${selection}/`,            
            headers: {                
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            message.success(`Устгагдлаа.`)
            Router.reload()          
        })
        .catch(err => {
            console.log(err)
        })
    }

    function onSearch(val) {                
        let url = `${api.movielist}?search=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setMovies(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect(e) {                
        setSelection(e.target.value)
    }

    return (
        <div>
            <Typography.Title level={4}>Кино засах</Typography.Title>
            <Search placeholder='Кино хайх' onSearch={onSearch} enterButton />
            <div style={{ marginTop: '8px', padding: '8px' }}>
                <Radio.Group onChange={onSelect}>
                    <Space direction='vertical'>
                        {movies.map(movie => (
                            <Radio key={movie.id} value={movie.id}>{movie.title} ({dayjs(movie.releasedate).year()})</Radio>
                        ))}
                    </Space>
                </Radio.Group>               
            </div>
            <Divider />
            { selection ? (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Нэр" name="title">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Нээлт" name="releasedate">
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Хугацаа" name="duration">
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Агуулга" name="description">
                                <Input.TextArea rows={4} />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item label="Жанр" name="genres">
                                <Select                                
                                    mode='multiple'
                                    optionFilterProp='children'
                                >
                                    { genres ? (
                                        <>
                                            {genres.map(item => {
                                                return (
                                                    <Select.Option key={item.id}>{item.name}</Select.Option>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Насны ангилал:" name="rating">
                                <Select                                                            
                                    optionFilterProp='children'
                                >                              
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Продакшн" name="productions">
                                <Select                                
                                    mode='multiple'
                                    optionFilterProp='children'
                                >
                                    { productions ? (
                                        <>
                                            {productions.map(item => {
                                                return (
                                                    <Select.Option key={item.id}>{item.name}</Select.Option>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Трейлер" name="trailer">
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Постер" name="poster">                            
                                <ImageUpload onImageSelected={(path) => setPoster(path)} height="300px" width="200px" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Зураг" name="background">                            
                                <ImageUpload onImageSelected={(path) => setBackground(path)} height="400px" width="800px" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Popconfirm title="Хадгалах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={form.submit}>
                                    <Button block size="large" type="primary">
                                        Хадгалах
                                    </Button>
                                </Popconfirm>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <Popconfirm title="Устгах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={onDelete}>
                                    <Button block danger size="large" type="primary">
                                        Устгах
                                    </Button>
                                </Popconfirm>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <></>
            )}                
        </div>
    )
}

export default MovieUpdate