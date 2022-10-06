import { Space, List, Col, Row, Button, Avatar } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import MovieCastModalCreate from '../MovieCastModalCreate'
import MovieCastModalUpdate from '../MovieCastModalUpdate'
import api from '../../../../api'

const MovieEditCast = (props) => {
    const [data, setData] = useState()
    const [createItem, setCreateItem] = useState(false)
    const [updateItem, setUpdateItem] = useState()

    useEffect(() => {
        getCast(props.movie.id)
    }, [props.movie.id])


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
        getCast(props.movie.id)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCast(props.movie.id)
    }

    function onDeleteItem (item) {
        axios({
            method: 'DELETE',
            url: `${api.moviecast}/${item.id}/`,            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            getCast(props.movie.id)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Жүжигчин нэмэх</Button>
            { createItem ? (
                <MovieCastModalCreate movie={props.movie.id} token={props.token} hide={onHideCreateItem} />
            ) : (
                <></>
            )}
            { updateItem ? (
                <MovieCastModalUpdate id={updateItem.id} token={props.token} hide={onHideUpdateItem} is_lead={updateItem.is_lead} role_name={updateItem.role_name} />
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
    )
}

export default MovieEditCast