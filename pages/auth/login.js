import { Form, Button, Input, Typography, Divider } from 'antd'
import Link from 'next/link'

const login = () => {

    function onFinish () {

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '80vh' }}>
            <div style={{ borderRadius: '4px', background: '#fff', padding: '24px', width: '320px' }}>
                <Typography.Title level={4} style={{ textAlign: 'center' }}>Нэвтрэх</Typography.Title>
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
                        label="Нууц үг"
                        name="password"
                        rules={[{ required: true, message: 'Нууц үг оруулна уу!' }]}
                    >
                        <Input
                            type="password"
                        />
                    </Form.Item>

                    <Link href="/auth/forgot-password">
                        <a className="login-form-forgot" style={{ display: 'block', textAlign: 'right', marginBottom: '8px' }}>
                            Нууц үг мартсан?
                        </a>
                    </Link>

                    <Button block type="primary" htmlType="submit" className="login-form-button" style={{ marginBottom: '8px' }}>
                        Нэвтрэх
                    </Button>
                    
                    <Link href="/auth/register">
                        <a> Шинээр бүртгүүлэх!</a>
                    </Link>
                </Form>
            </div>
        </div>
    )
}

export default login