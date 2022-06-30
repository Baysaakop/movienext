import { Checkbox, Form, Input, Modal, Radio, Space, Button, message } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import api from '../../../api'

const ArtistCastModalCreate = (props) => {
    const [form] = Form.useForm()
    const [movies, setMovies] = useState([])
    const [selection, setSelection] = useState()
    const [checked, setChecked] = useState(false)

    function onSearch (val) {
        let url = `${api.movielist}?search=${val}`
        axios({
            method: 'GET',
            url: url,
        }).then(res => {                        
            setMovies(res.data.results)                                    
        }).catch(err => {
            console.log(err.message)
            message.error("Алдаа гарлаа. Хуудсыг refresh хийнэ үү.")                        
        })        
    }

    function onSelect (e) {
        setSelection(e.target.value)
    }

    function onFinish (values) {
        var formData = new FormData()
        formData.append('movie', selection)
        formData.append('artist', props.artist)
        formData.append('token', props.token)
        if (checked) {
            formData.append('is_lead', true)
        }
        if (values.role_name) {
            formData.append('role_name', values.role_name)
        }
        axios({
            method: 'POST',
            url: `${api.moviecast}/`,
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
                title="Кино нэмэх"
                footer={null}
                onCancel={() => props.hide()}
                width={400}
                style={{ padding: 0 }}
            >
                <div>
                    <Input.Search placeholder='Кино хайх' onSearch={onSearch} enterButton />
                    <div style={{ margin: '8px 0', padding: '8px' }}>
                        <Radio.Group onChange={onSelect}>
                            <Space direction='vertical'>
                                {movies.map(movie => (
                                    <Radio key={movie.id} value={movie.id}>{movie.title} ({dayjs(movie.releasedate).year()})</Radio>
                                ))}
                            </Space>
                        </Radio.Group>               
                    </div>                    
                    { selection ? (
                        <div>
                            <Form form={form} layout="vertical" onFinish={onFinish}>
                                <Form.Item name="is_lead" label="Гол дүр:">                        
                                    <Checkbox onChange={onChange}>Тийм</Checkbox>
                                </Form.Item>
                                <Form.Item name="role_name" label="Дүр:">                        
                                    <Input />
                                </Form.Item>      
                                <Button block type="primary" onClick={form.submit}>
                                    Хадгалах
                                </Button>
                            </Form>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default ArtistCastModalCreate