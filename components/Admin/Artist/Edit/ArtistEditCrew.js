import { Typography, Input, Radio, Space, Divider, List, Col, Row, Button, Avatar } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import api from '../../../../api'
import ArtistCrewModalCreate from '../ArtistCrewModalCreate'
import MovieCrewModalUpdate from '../../Movie/MovieCrewModalUpdate'

const ArtistEditCrew = (props) => {
    const [data, setData] = useState()
    const [createItem, setCreateItem] = useState(false)
    const [updateItem, setUpdateItem] = useState()

    useEffect(() => {
        getCrew(props.artist.id)
    }, [props.artist.id])

    function getCrew (id) {
        axios({
            method: 'GET',
            url: `${api.moviecrew}/?artist=${id}`,            
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
        getCrew(props.artist.id)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCrew(props.artist.id)
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
            getCrew(props.artist.id)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Кино нэмэх</Button>
            { createItem ? (
                <ArtistCrewModalCreate artist={props.artist.id} token={props.token} hide={onHideCreateItem} />
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
                    <strong>Кино</strong>
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
                            <Col span={8}>
                                {item.movie.title} ({dayjs(item.movie.releasedate).year()})
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

export default ArtistEditCrew