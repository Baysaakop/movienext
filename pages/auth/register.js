import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Button, Input, Typography, Divider } from 'antd'
import Link from 'next/link'

const register = () => {

    function onFinish () {

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
            <div style={{ borderRadius: '4px', background: '#fff', padding: '24px', width: '320px' }}>                
                <Typography.Title level={4} style={{ textAlign: 'center' }}>Бүртгүүлэх</Typography.Title>
                <Divider style={{ margin: '8px 0' }} />
                <Form
                    name='login'          
                    layout='vertical'          
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="И-мэйл"
                        name="email"                    
                        rules={[
                            {
                                type: 'email',
                                message: 'И-мэйл буруу байна!',
                            },
                            { 
                                required: true, 
                                message: 'И-мэйл оруулна уу!' 
                            }
                        ]}
                    >
                        <Input 
                            type="email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Хэрэглэгчийн нэр"
                        tooltip="Бусад хэрэглэгчдэд харагдах таны профайл хуудсын нэр"
                        rules={[{ required: true, message: 'Хэрэглэгчийн нэр оруулна уу!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Нууц үг"
                        rules={[
                        {
                            required: true,
                            message: 'Нууц үг оруулна уу!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Нууц үг давтах"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Нууц үгээ лавтаж оруулна уу!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Нууц үгүүд хоорондоо таарахгүй байна!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>                   

                    <Button block type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: '8px' }}>
                        Бүртгүүлэх
                    </Button>
                    
                    <Link href="/auth/login">
                        <a> Өмнө нь бүртгүүлсэн!</a>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default register