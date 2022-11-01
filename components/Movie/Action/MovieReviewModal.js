import { SendOutlined } from '@ant-design/icons'
import { Form, Modal, Input, Button, Checkbox, message } from 'antd'
import axios from 'axios'
import api from '../../../api'

const MovieReviewModal = (props) => {

    const [form] = Form.useForm()

    function onFinish (values) {
        if (props.user && props.token) {
            axios({
                method: 'POST',
                url: `${api.moviecomments}/`,
                data: {
                    movie: props.movieID,
                    token: props.token,
                    comment: values.comment
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(res => {
                if (res.status === 201) {
                    form.resetFields()
                    props.finish()
                }
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            message.warn("Энэ үйлдлийг хийхийн тулд нэвтрэх шаардлагатай.")
        }
    }

    return (
        <div>
            <Modal                
                className="review"
                centered
                visible={true}
                footer={null}
                onCancel={() => props.hide()}
                title="Сэтгэгдэл үлдээх"
                style={{ padding: 0 }}
            >
                <div>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name="comment" rules={[{ required: 'true', message: 'Сэтгэгдэл хоосон байна!' }]} style={{ marginBottom: '8px' }}>
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="is_spoiler">
                            <Checkbox>Spoiler агуулсан</Checkbox>
                        </Form.Item>
                        <Button size='small' type='primary' onClick={form.submit} icon={<SendOutlined />}>Илгээх</Button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default MovieReviewModal