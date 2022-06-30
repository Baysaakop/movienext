import { Checkbox, Form, Input, Modal, Radio, Space, Button, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../api'

const MovieCastModalUpdate = (props) => {
    const [form] = Form.useForm()
    const [checked, setChecked] = useState()

    function onFinish (values) {
        var formData = new FormData()
        if (checked !== props.is_lead) {
            formData.append('is_lead', checked)
        }
        if (values.role_name !== props.role_name) {
            formData.append('role_name', values.role_name)
        }
        axios({
            method: 'PUT',
            url: `${api.moviecast}/${props.id}/`,
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

    function onChange (e) {
        setChecked(e.target.checked)
    }

    return (
        <div>
            <Modal                                
                centered
                visible={true}
                title="Дүр засах"
                footer={null}
                onCancel={() => props.hide()}
                width={400}
                style={{ padding: 0 }}
            >
                <div>
                    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ role_name: props.role_name }}>
                        <Form.Item name="is_lead" label="Гол дүр:">                        
                            <Checkbox defaultChecked={props.is_lead} onChange={onChange}>Тийм</Checkbox>
                        </Form.Item>
                        <Form.Item name="role_name" label="Дүр:">                        
                            <Input />
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

export default MovieCastModalUpdate