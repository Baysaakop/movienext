import { Space, List, Col, Row, Button } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons'
import api from '../../../../api'
import ArtistCastModalCreate from '../ArtistCastModalCreate'
import MovieCastModalUpdate from '../../Movie/MovieCastModalUpdate'

const ArtistEditCast = (props) => {
    const [data, setData] = useState()
    const [createItem, setCreateItem] = useState(false)
    const [updateItem, setUpdateItem] = useState()

    useEffect(() => {
        getCast(props.artist.id)
    }, [props.artist.id])

    function getCast (id) {
        axios({
            method: 'GET',
            url: `${api.moviecast}/?artist=${id}`,            
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
        getCast(props.artist.id)
    }

    function onShowUpdateItem (item) {
        setUpdateItem(item)
    }

    function onHideUpdateItem () {
        setUpdateItem(undefined)
        getCast(props.artist.id)
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
            getCast(props.artist.id)
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateItem(true)}>Кино нэмэх</Button>
            { createItem ? (
                <ArtistCastModalCreate artist={props.artist.id} token={props.token} hide={onHideCreateItem} />
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
                    <strong>Кино</strong>
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
                            <Col span={8}>
                                {item.movie.title} ({dayjs(item.movie.releasedate).year()})
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

export default ArtistEditCast