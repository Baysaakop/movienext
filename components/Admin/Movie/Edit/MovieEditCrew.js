import { Space, List, Col, Row, Button, Avatar } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import api from '../../../../api'
import MovieCrewModalCreate from '../MovieCrewModalCreate'
import MovieCrewModalUpdate from '../MovieCrewModalUpdate'

const MovieEditCrew = (props) => {
    const [data, setData] = useState()
    const [createItem, setCreateItem] = useState(false)
    const [updateItem, setUpdateItem] = useState()

    useEffect(() => {
        getCrew(props.movie.id)
    }, [props.movie.id])

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
        getCrew(props.movie.id)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCrew(props.movie.id)
    }

    function onDeleteItem (item) {
        axios({
            method: 'DELETE',
            url: `${api.moviecrew}/${item.id}/`,            
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            getCrew(props.movie.id)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Уран бүтээлч нэмэх</Button>
            { createItem ? (
                <MovieCrewModalCreate movie={props.movie.id} token={props.token} hide={onHideCreateItem} />
            ) : (
                <></>
            )}
            { updateItem ? (
                <MovieCrewModalUpdate id={updateItem.id} token={props.token} hide={onHideUpdateItem} />
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
    )
}

export default MovieEditCrew