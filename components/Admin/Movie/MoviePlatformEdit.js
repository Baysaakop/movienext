import { Typography, Input, Radio, Space, Divider, List, Col, Row, Button, Avatar, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../api'
import dayjs from 'dayjs'
import Loading from '../../Loading'

const { Search } = Input

const MoviePlatformEdit = ({ token }) => {
    const [platforms, setPlatforms] = useState([])
    const [movies, setMovies] = useState([])    
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPlatforms()
    }, [])

    function getPlatforms () {
        axios({
            method: 'GET',
            url: api.platforms
        })
        .then(res => {
            setPlatforms(res.data.results)
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
        getData(e.target.value)
    }

    function getData(id) {
        setLoading(true)
        axios({
            method: 'GET',
            url: `${api.moviedetail}/${id}/`,
        }).then(res => {                        
            setData(res.data)                                    
            setLoading(false)
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
            setLoading(false)
        })        
    }

    function getUrl(id) {
        let item = data.platforms.find(x => x.platform.id === id)
        if (item) {
            return item.url
        }
        return ""
    }

    function onSubmit(val, id) {
        axios({
            method: 'PUT',
            url: `${api.moviedetail}/${data.id}/`,
            data: {
                'platform': id,
                'url': val
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            message.success("Амжилттай хадгалагдлаа.")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Typography.Title level={4}>Үзэх суваг</Typography.Title>
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
            { loading ? (
                <Loading />
            ) : (
                data ? (
                    <div>
                        <Row gutter={16} style={{ marginTop: '16px' }}>
                            <Col span={5}>
                                <strong>Суваг</strong>
                            </Col>
                            <Col span={19}>
                                <strong>Линк</strong>
                            </Col>
                            <List
                                itemLayout="horizontal"
                                dataSource={platforms}
                                size="small"
                                style={{ width: '100%' }}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <Col span={2}>
                                            <Avatar src={item.logo} shape="square" size="large" />                                        
                                        </Col>
                                        <Col span={3}>
                                            {item.name}
                                        </Col>
                                        <Col span={19}>                                         
                                            <Input.Search defaultValue={getUrl(item.id)} enterButton="Хадгалах" onSearch={(val) => onSubmit(val, item.id)} />                            
                                        </Col>                                    
                                    </List.Item>
                                )}
                            />
                        </Row>                    
                    </div>
                ) : (
                    <></>
                )
            )}      
        </div>
    )
}

export default MoviePlatformEdit