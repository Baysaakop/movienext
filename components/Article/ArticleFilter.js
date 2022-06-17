import { Button, Form, Input, Select, Typography } from "antd"

const { Search } = Input
const { Option } = Select

const ArticleFilter = ({ categories }) => {

    const [form] = Form.useForm()

    function onSearch(val) {
        console.log(val)
    }

    return (
        <div>
            <Typography.Title level={5}>Нийтлэл шүүх</Typography.Title>
            <Form
                layout="vertical"
                form={form}
                initialValues={{ 
                    type: '0',
                    order: '0'
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
                <Form.Item label="Төрөл" name="type">
                    <Select style={{ width: '100%' }}>
                        <Option value="0">Бүх</Option>
                        { categories.map(cat => (
                            <Option key={cat.id} value={cat.id}>{cat.name}</Option>
                        )) }
                    </Select>
                </Form.Item>
                <Form.Item label="Эрэмбэлэх" name="order">
                    <Select style={{ width: '100%' }}>
                        <Option value="0">Сүүлд нэмэгдсэн</Option>
                        <Option value="1">Like-н тоогоор</Option>
                        <Option value="2">Үзэлтийн тоогоор</Option>                                
                    </Select>
                </Form.Item>
                <Button block type="primary" htmlType="submit">Хайх</Button>
            </Form>
        </div>
    )
}

export default ArticleFilter