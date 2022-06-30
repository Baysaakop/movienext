import { Form, Input, Modal, Radio, Space, Button, message, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../api'
import dayjs from 'dayjs'

const ArtistCrewModalCreate = (props) => {
    const [form] = Form.useForm()
    const [movies, setMovies] = useState([])
    const [selection, setSelection] = useState()
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
        formData.append('roles', values.roles)
        axios({
            method: 'POST',
            url: `${api.moviecrew}/`,
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
                    ) : (
                        <></>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default ArtistCrewModalCreate