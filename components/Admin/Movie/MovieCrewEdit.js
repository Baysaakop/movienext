import { Typography, Input, Radio, Space, Divider, List, Col, Row, Button, Avatar } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import api from '../../../api'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import MovieCrewModalUpdate from './MovieCrewModalUpdate'
import MovieCrewModalCreate from './MovieCrewModalCreate'

const { Search } = Input

const MovieCrewEdit = ({ token }) => {

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
        getCrew(e.target.value)
    }

    function getCrew (id) {
        axios({
            method: 'GET',
            url: `${api.moviecrew}/?movie=${id}`,            
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
        getCrew(selection)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCrew(selection)
    }

    function onDeleteItem (item) {
        axios({
            method: 'DELETE',
            url: `${api.moviecrew}/${item.id}/`,            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`            
            }
        })
        .then(res => {                        
            getCrew(selection)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Баг бүрэлдэхүүн</Typography.Title>
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
                    <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Уран бүтээлч нэмэх</Button>
                    { createItem ? (
                        <MovieCrewModalCreate movie={selection} token={token} hide={onHideCreateItem} />
                    ) : (
                        <></>
                    )}
                    { updateItem ? (
                        <MovieCrewModalUpdate id={updateItem.id} token={token} hide={onHideUpdateItem} />
                    ) : (
                        <></>
                    )}
                    <Row gutter={16} style={{ marginTop: '16px' }}>
                        <Col span={8}>
                            <strong>Уран бүтээлч</strong>
                        </Col>
                        <Col span={10}>
                            <strong>Роль</strong>
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
                                    <Col span={10}>
                                        {item.roles.map(role => (
                                            <span key={role.id}>{role.name} | </span>
                                        ))}
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

export default MovieCrewEdit