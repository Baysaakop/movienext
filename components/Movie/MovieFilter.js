import React, { useState, useEffect } from 'react'
import { Col, Form, Input, Row, Segmented, Select } from 'antd'
import axios from 'axios'
import styles from '../../styles/Movie.module.css'
import api from '../../api'

const { Search } = Input
const { Option } = Select

const MovieFilter = (props) => {
    const [form] = Form.useForm()
    const [genres, setGenres] = useState([])
    const [decade, setDecade] = useState()    

    useEffect(() => {
        getGenres()
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

    function onSearch(val) {        
        props.onSearch(val)
    }

    function onGenreSelect(id) {
        props.onGenreSelect(id)
    }

    function onDecadeSelect(decade) {
        setDecade(decade)
        props.onDecadeSelect(decade)
    }

    function onYearSelect(year) {
        if (year === 'Бүх') {
            props.onYearSelect(0)
        } else {
            props.onYearSelect(parseInt(year))
        }        
    }

    function onScoreToSelect(score) {
        props.onScoreToSelect(score)
    }

    function onOrderSelect(order) {
        props.onOrderSelect(order)
    }

    return (
        <div className={styles.movieFilter}>
            <Form
                layout='vertical'
                form={form}
                initialValues={{
                    'genre': 0,
                    'decade': 0,
                    'score': 0,
                    'order': '-view_count'
                }}
            >
                <Form.Item label="Кино хайх" name="search">
                    <Search 
                        allowClear
                        enterButton
                        placeholder="Киноны нэр" 
                        style={{ width: '100%' }} 
                        onSearch={onSearch}
                    />          
                </Form.Item>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Жанр" name="genre">
                            <Select style={{ width: '100%' }} onSelect={onGenreSelect}>
                                <Option value={0}>Бүх</Option>
                                {genres.map(genre => (
                                    <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Он" name="decade">
                            <Select style={{ width: '100%' }} onSelect={onDecadeSelect}>
                                <Option value={0}>Бүх</Option>
                                <Option value={2020}>2020-д</Option>
                                <Option value={2010}>2010-д</Option>
                                <Option value={2000}>2000-д</Option>
                                <Option value={1990}>1990-д</Option>
                                <Option value={1980}>1980-д</Option>
                                <Option value={1970}>1970-д</Option>
                                <Option value={1960}>1960-д</Option>
                                <Option value={1950}>1950-д</Option>
                                <Option value={1940}>1940-д</Option>
                                <Option value={1930}>1930-д</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Үнэлгээ" name="score">
                            <Select style={{ width: '100%' }} onSelect={onScoreToSelect}>
                                <Option value={0}>Бүх</Option>
                                <Option value={1}>★</Option>
                                <Option value={2}>★★</Option>
                                <Option value={3}>★★★</Option>
                                <Option value={4}>★★★★</Option>
                                <Option value={5}>★★★★★</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Эрэмбэлэх" name="order">
                            <Select style={{ width: '100%' }} onSelect={onOrderSelect}>
                                <Option value="-created_at">Сүүлд нэмэгдсэн</Option>
                                <Option value="created_at">Эхэнд нэмэгдсэн</Option>
                                <Option value="-view_count">Хандалт буурахаар</Option>
                                <Option value="view_count">Хандалт өгсөхөөр</Option>
                                <Option value="-releasedate">Нээлтийн огноо (шинэ)</Option>
                                <Option value="releasedate">Нээлтийн огноо (хуучин)</Option>
                                <Option value="-avg_score">Үнэлгээ буурахаар</Option>                                
                                <Option value="avg_score">Үнэлгээ өгсөхөөр</Option>                                
                            </Select>
                        </Form.Item>
                    </Col>
                    { decade && decade > 0 ? (
                        <Col span={24}>
                            <div style={{ marginBottom: '24px' }}>
                                <Segmented
                                    block
                                    defaultValue='Бүх'
                                    options={['Бүх', decade.toString(), (decade+1).toString(), (decade+2).toString(), (decade+3).toString(), (decade+4).toString(), (decade+5).toString(), (decade+6).toString(), (decade+7).toString(), (decade+8).toString(), (decade+9).toString() ]} 
                                    onChange={onYearSelect}
                                />
                            </div>
                        </Col>
                    ) : (
                        <></>
                    )}
                </Row>
            </Form>                         
        </div>
    )
}

export default MovieFilter