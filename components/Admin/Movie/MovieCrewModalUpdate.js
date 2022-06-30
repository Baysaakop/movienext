import { Form, Input, Modal, Radio, Space, Button, message, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../api'

const MovieCrewModalUpdate = (props) => {
    const [form] = Form.useForm()
    const [roles, setRoles] = useState([])

    useEffect(() => {
        axios({
            method: 'GET',
            url: api.occupations
        })
        .then(res => {
            setRoles(res.data.results.filter(x => x.id !== 1))
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    function onFinish (values) {
        var formData = new FormData()
        formData.append('roles', values.roles)
        axios({
            method: 'PuT',
            url: `${api.moviecrew}/${props.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`            
            }
        })
        .then(res => {                        
            props.hide()
        })
        .catch(err => {
            message.error("Алдаа гарлаа. Та хуудсаа refresh хийнэ үү.")
        })
    }

    return (
        <div>
            <Modal                                
                centered
                visible={true}
                title="Роль засах"
                footer={null}
                onCancel={() => props.hide()}
                width={400}
                style={{ padding: 0 }}
            >
                <div>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item name="roles" label="Роль:" rules={[{ required: true, message: 'Роль сонгоно уу!' }]}>                        
                            <Select                                
                                mode='multiple'
                                optionFilterProp='children'
                            >
                                {roles.map(item => (
                                    <Select.Option key={item.id}>{item.name}</Select.Option>                                            
                                ))}
                            </Select>
                        </Form.Item>      
                        <Button block type="primary" onClick={form.submit}>
                            Хадгалах
                        </Button>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default MovieCrewModalUpdate