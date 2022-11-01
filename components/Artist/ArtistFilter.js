import { Col, Form, Input, Row, Select } from 'antd'
import axios from 'axios'
import api from '../../api'
import { useEffect, useState } from 'react'
import styles from '../../styles/Artist/ArtistList.module.css'

const { Search } = Input
const { Option } = Select

const ArtistFilter = (props) => {

    const [form] = Form.useForm()
    const [occupations, setOccupations] = useState([])

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

    function onSearch(val) {
        props.onSearch(val)
    }

    function onOccupationSelect(id) {
        props.onOccupationSelect(id)
    }

    function onOrderSelect(order) {
        props.onOrderSelect(order)
    }

    return (
        <div className={styles.artistFilter}>
            <Form
                layout='vertical'
                form={form}
                initialValues={{                  
                    'search': props.search,
                    'occupation': props.occupation,
                    'order': props.order
                }}
            >
                <Form.Item label="Уран бүтээлч хайх" name="search">
                    <Search 
                        allowClear
                        enterButton
                        placeholder="Уран бүтээлчийн нэр" 
                        style={{ width: '100%' }} 
                        onSearch={onSearch}
                    />          
                </Form.Item>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item label="Мэргэжил" name="occupation">
                            <Select style={{ width: '100%' }} onSelect={onOccupationSelect}>
                                <Option value={0}>Бүх</Option>
                                {occupations.map(o => (
                                    <Option key={o.id} value={o.id}>{o.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item label="Эрэмбэлэх" name="order">
                            <Select style={{ width: '100%' }} onSelect={onOrderSelect}>
                                <Option value="-created_at">Сүүлд нэмэгдсэн</Option>
                                <Option value="created_at">Эхэнд нэмэгдсэн</Option>
                                <Option value="-view_count">Хандалт буурахаар</Option>
                                <Option value="view_count">Хандалт өгсөхөөр</Option>
                                <Option value="firstname">Үсгийн дараалал (А-Я)</Option>
                                <Option value="-firstname">Үсгийн дараалал (Я-А)</Option>                                             
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>                         
        </div>
    )
}

export default ArtistFilter