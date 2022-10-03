import { CommentOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons';
import { Typography, Avatar, List, Rate, Button, Form, Input, Comment, Tooltip } from 'antd'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../api';
import Loading from '../Loading'
import dayjs from 'dayjs'

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const MovieComments = ({ id, token, user }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)    

    useEffect(() => {
        getComments(id)
    }, [id])

    function getComments(movie_id) {
        setLoading(true)
        axios({
            method: 'GET',
            url: `${api.moviecomments}?movie=${movie_id}`
        })
        .then(res => {       
            setTotal(res.data.count)
            setData(res.data.results)
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    function onFinish(values) {
        axios({
            method: 'POST',
            url: `${api.moviecomments}/`,
            data: {
                movie: id,
                token: token,
                comment: values.comment
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            if (res.status === 201) {
                form.resetFields()
                getComments(id)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <Typography.Title level={5}>Сэтгэгдэл ({total})</Typography.Title>
            { user ? (
                <div style={{ padding: '0px 16px' }}>
                    <Comment
                        avatar={
                            user.avatar ? 
                                <Avatar size="large" src={user.avatar} />
                            :
                                <Avatar size="large" style={{ background: '#28202f' }}>
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                        }
                        content={
                            <Form form={form} onFinish={onFinish}>
                                <Form.Item name="comment" rules={[{ required: 'true', message: 'Сэтгэгдэл хоосон байна!' }]} style={{ marginBottom: '8px' }}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Button size='small' type='primary' onClick={form.submit} icon={<SendOutlined />}>Илгээх</Button>
                            </Form>
                        }
                    />
                </div>
            ) : (
                <></>
            )} 
            { loading ? (
                <Loading />
            ) : (
                <List 
                    itemLayout='horizontal'
                    size='small'
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Comment                                
                                actions={[
                                    <Tooltip key="like" title="Like">
                                        <Button type='text' size='small' icon={<LikeOutlined />} style={{ marginRight: '8px' }}> {item.like_count}</Button>
                                    </Tooltip>,
                                    <Tooltip key="like" title="Reply">
                                        <Button type='text' size='small' icon={<CommentOutlined />} style={{ marginRight: '8px' }}></Button>
                                    </Tooltip>
                                ]}
                                author={
                                    <Link href={`/users/${item.user.id}`}>
                                        <a style={{ color: '#000', fontSize: '14px' }}>
                                            {item.user.username}
                                        </a>
                                    </Link>             
                                }
                                datetime={dayjs(item.created_at).fromNow()}
                                avatar={
                                    item.user.avatar ? 
                                        <Avatar size="large" src={item.user.avatar} />
                                    :
                                        <Avatar size="large" style={{ background: '#28202f' }}>
                                            {item.user.username.charAt(0).toUpperCase()}
                                        </Avatar>                                    
                                }
                                content={
                                    <div>
                                        <Rate allowHalf disabled defaultValue={item.score / 2} style={{ fontSize: '14px', marginBottom: '2px' }} />        
                                        <p>{item.comment}</p>
                                    </div>
                                }                           
                            />
                        </List.Item>
                    )}
                />
            )}           
        </div>
    )
}
        
export default MovieComments