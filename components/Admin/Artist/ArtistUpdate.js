import { Form, Input, Row, Col, Typography, DatePicker, Select, Popconfirm, Button, message, Divider, Radio, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../../api'
import ImageUpload from '../../ImageUpload'
import moment from 'moment'
import Router from 'next/router'

const { Search } = Input

const ArtistUpdate = ({ token }) => {

    const [form] = Form.useForm()
    const [occupations, setOccupations] = useState([])    
    const [image, setImage] = useState()    

    const [artists, setArtists] = useState([])
    const [selection, setSelection] = useState()

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
        if (values.name) {
            formData.append('name', values.name)
        }
        if (values.firstname) {
            formData.append('firstname', values.firstname)
        }
        if (values.lastname) {
            formData.append('lastname', values.lastname)
        }
        if (values.birthdate) {
            formData.append('birthdate', moment(values.birthdate).format("YYYY-MM-DD"))
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
            method: 'PUT',
            url: `${api.artistdetail}/${selection}/`,
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
            url: `${api.artistdetail}/${selection}/`,            
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
        let url = `${api.artistlist}?search=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setArtists(res.data.results)                                    
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
            <Typography.Title level={4}>Уран бүтээлч засах</Typography.Title>
            <Search placeholder='Уран бүтээлч хайх' onSearch={onSearch} enterButton />
            <div style={{ marginTop: '8px', padding: '8px' }}>
                <Radio.Group onChange={onSelect}>
                    <Space direction='vertical'>
                        {artists.map(artist => (
                            <Radio key={artist.id} value={artist.id}>{artist.name}</Radio>
                        ))}
                    </Space>
                </Radio.Group>               
            </div>
            <Divider />
            { selection ? (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Уран бүтээлчийн нэр" name="name">
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

export default ArtistUpdate