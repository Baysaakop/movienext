import { Typography, Input, Radio, Space, Divider, List, Col, Row, Button, Avatar } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import api from '../../../api'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import MovieCastModalCreate from './MovieCastModalCreate'
import MovieCastModalUpdate from './MovieCastModalUpdate'

const { Search } = Input

const MovieCastEdit = ({ token }) => {

    const [movies, setMovies] = useState([])
    const [selection, setSelection] = useState()
    const [data, setData] = useState()
    const [createItem, setCreateItem] = useState(false)
    const [updateItem, setUpdateItem] = useState()

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
        getCast(e.target.value)
    }

    function getCast (id) {
        axios({
            method: 'GET',
            url: `${api.moviecast}/?movie=${id}`,            
        })
        .then(res => {
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function onHideCreateItem () {
        setCreateItem(false)
        getCast(selection)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCast(selection)
    }

    function onDeleteItem (item) {
        axios({
            method: 'DELETE',
            url: `${api.moviecast}/${item.id}/`,            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`            
            }
        })
        .then(res => {                        
            getCast(selection)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Жүжигчид</Typography.Title>
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
                <div>
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Жүжигчин нэмэх</Button>
                    { createItem ? (
                        <MovieCastModalCreate movie={selection} token={token} hide={onHideCreateItem} />
                    ) : (
                        <></>
                    )}
                    { updateItem ? (
                        <MovieCastModalUpdate id={updateItem.id} token={token} hide={onHideUpdateItem} is_lead={updateItem.is_lead} role_name={updateItem.role_name} />
                    ) : (
                        <></>
                    )}
                    <Row gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={8}>
                            <strong>Жүжигчин</strong>
                        </Col>
                        <Col span={6}>
                            <strong>Дүр</strong>
                        </Col>
                        <Col span={4}>
                            <strong>Гол / Туслах</strong>
                        </Col>
                        <Col span={6}>
                            <strong>Засах / Устгах</strong>
                        </Col>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            size="small"
                            style={{ width: '100%' }}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <Col span={2}>
                                        <Avatar src={item.artist.image} shape="square" size="large" />                                        
                                    </Col>
                                    <Col span={6}>
                                        {item.artist.name}
                                    </Col>
                                    <Col span={6}>
                                        {item.role_name}
                                    </Col>
                                    <Col span={4}>
                                        {item.is_lead ? "Гол" : "Туслах"}
                                    </Col>
                                    <Col span={6}>
                                        <Space size={8} wrap>
                                            <Button type='ghost' onClick={() => onShowUpdateItem(item)}>Засах</Button>
                                            <Button danger type='ghost' onClick={() => onDeleteItem(item)}>Устгах</Button>
                                        </Space>
                                    </Col>
                                </List.Item>
                            )}
                        />
                    </Row>                    
                </div>
            ) : (
                <></>
            )}       
        </div>
    )
}

export default MovieCastEdit