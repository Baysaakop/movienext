import { Col, Form, Input, Row, Select } from 'antd'
import styles from '../../styles/Artist.module.css'

const { Search } = Input
const { Option } = Select

const ArtistFilter = () => {

    const [form] = Form.useForm()

    function onSearch(val) {
        console.log(val)
    }

    return (
        <div className={styles.artistFilter}>
            <Form
                layout='vertical'
                form={form}
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
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <Form.Item label="Мэргэжил" name="occupation">
                            <Select style={{ width: '100%' }}>
                                <Option value="0">All</Option>
                                <Option value="1">Жүжигчин</Option>
                                <Option value="2">Найруулагч</Option>
                                <Option value="3">Продюсер</Option>
                                <Option value="4">Кино зохиолч</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <Form.Item label="Он" name="year">
                            <Select style={{ width: '100%' }}>
                                <Option value="0">2000-с хойш</Option>
                                <Option value="1">1990~2000</Option>
                                <Option value="2">1980~1990</Option>
                                <Option value="3">1970~1980</Option>
                                <Option value="4">1960~1970</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8}>
                        <Form.Item label="Эрэмбэлэх" name="order">
                            <Select style={{ width: '100%' }}>
                                <Option value="0">Сүүлд нэмэгдсэн</Option>
                                <Option value="1">Насаар</Option>
                                <Option value="2">Үсгийн дарааллаар</Option>                                
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>                         
        </div>
    )
}

export default ArtistFilter