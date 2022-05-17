import { Button, Form, Input, Select, Typography } from "antd"

const { Search } = Input
const { Option } = Select

const ArticleFilter = () => {

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
                    <Select defaultValue="0" style={{ width: '100%' }}>
                        <Option value="0">Бүх</Option>
                        <Option value="1">Мэдээ мэдээлэл</Option>
                        <Option value="2">Шүүмж сэтгэгдэл</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Эрэмбэлэх" name="order">
                    <Select defaultValue="0" style={{ width: '100%' }}>
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