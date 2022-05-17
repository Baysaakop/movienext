import { Col, Form, Input, Row, Select } from 'antd'
import styles from '../../styles/Movie.module.css'

const { Search } = Input
const { Option } = Select

const MovieFilter = () => {

    const [form] = Form.useForm()

    function onSearch(val) {
        console.log(val)
    }

    return (
        <div className={styles.movieFilter}>
            <Form
                layout='vertical'
                form={form}
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
                            <Select defaultValue="0" style={{ width: '100%' }}>
                                <Option value="0">All</Option>
                                <Option value="1">Action</Option>
                                <Option value="2">Adventure</Option>
                                <Option value="3">Comedy</Option>
                                <Option value="4">Drama</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Он" name="year">
                            <Select defaultValue="0" style={{ width: '100%' }}>
                                <Option value="0">2020-с хойш</Option>
                                <Option value="1">2010~2020</Option>
                                <Option value="2">2000~2010</Option>
                                <Option value="3">1990~2000</Option>
                                <Option value="4">1980~1990</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Үнэлгээ" name="score">
                            <Select defaultValue="0" style={{ width: '100%' }}>
                                <Option value="0">0~1</Option>
                                <Option value="1">1~2</Option>
                                <Option value="2">2~3</Option>
                                <Option value="3">3~4</Option>
                                <Option value="4">4~5</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6}>
                        <Form.Item label="Эрэмбэлэх" name="order">
                            <Select defaultValue="0" style={{ width: '100%' }}>
                                <Option value="0">Сүүлд нэмэгдсэн</Option>
                                <Option value="1">Нээлтийн он сар өдөр</Option>
                                <Option value="2">Үнэлгээгээр</Option>                                
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>                         
        </div>
    )
}

export default MovieFilter