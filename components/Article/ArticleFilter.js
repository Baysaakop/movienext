import { Button, Form, Input, Select, Typography } from "antd"
import api from "../../api"
import axios from 'axios'
import { useState, useEffect } from 'react'

const { Search } = Input
const { Option } = Select

const ArticleFilter = (props) => {

    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])    

    useEffect(() => {
        getCategories()
    }, [])

    function getCategories () {
        axios({
            method: 'GET',
            url: api.categories
        })
        .then(res => {
            setCategories(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }    

    function onSearch(val) {        
        props.onSearch(val)
    }

    function onCategorySelect(id) {
        props.onCategorySelect(id)
    }

    function onOrderSelect(order) {
        props.onOrderSelect(order)
    }

    return (
        <div>
            <Typography.Title level={5}>Нийтлэл шүүх</Typography.Title>
            <Form
                layout="vertical"
                form={form}
                initialValues={{ 
                    'category': 0,
                    'order': '-created_at'
                }}
            >
                 <Form.Item label="Нэрээр хайх" name="search">
                    <Search 
                        allowClear
                        enterButton
                        placeholder="Нийтлэл..." 
                        style={{ width: '100%' }} 
                        onSearch={onSearch}
                    />          
                </Form.Item>
                <Form.Item label="Төрөл" name="category">
                    <Select style={{ width: '100%' }} onSelect={onCategorySelect}>
                        <Option value={0}>Бүх</Option>
                        {categories.map(cat => (
                            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Эрэмбэлэх" name="order">
                    <Select style={{ width: '100%' }} onSelect={onOrderSelect}>
                        <Option value="-created_at">Сүүлд нэмэгдсэн</Option>
                        <Option value="created_at">Эхэнд нэмэгдсэн</Option>
                        <Option value="-view_count">Хандалт буурахаар</Option>
                        <Option value="view_count">Хандалт өгсөхөөр</Option>
                        <Option value="-like_count">Like буурахаар</Option>
                        <Option value="like_count">Like өгсөхөөр</Option>                         
                    </Select>
                </Form.Item>
                <Button block type="primary" htmlType="submit">Хайх</Button>
            </Form>
        </div>
    )
}

export default ArticleFilter