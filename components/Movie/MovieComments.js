import { DislikeOutlined, ForwardOutlined, LikeOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Avatar, List, Rate, Space, Button, Form, Input, Comment, Tooltip } from 'antd'
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '../../api';

const MovieComments = ({ id, token, user }) => {
    const [form] = Form.useForm()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)    

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${api.moviecomments}?movie=${id}`
        })
        .then(res => {       
            setTotal(res.data.count)
            setData(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    function onFinish(values) {
        console.log(values)
    }

    return (
        <div>
            <Typography.Title level={5}>Сэтгэгдэл ({total})</Typography.Title>
            { user ? (
                <div style={{ padding: '0px 16px' }}>
                    <Comment
                        avatar={<Avatar src={user.avatar} />}
                        content={
                            <Form form={form} onFinish={onFinish}>
                                <Form.Item name="comment" rules={[{ required: 'true', message: 'Сэтгэгдэл хоосон байна!' }]}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' onClick={form.submit} icon={<SendOutlined />}>Илгээх</Button>
                                </Form.Item>
                            </Form>
                        }
                    />
                </div>
            ) : (
                <></>
            )}            
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
                                <Tooltip key="like" title="Like">
                                    <Button type='text' size='small' icon={<DislikeOutlined />} style={{ marginRight: '8px' }}> 0</Button>
                                </Tooltip>,
                                <Tooltip key="like" title="Reply">
                                    <Button type='text' size='small'> Reply</Button>
                                </Tooltip>
                            ]}
                            author={
                                <Space size={16} wrap>
                                    <Link href={`/users/${item.user.id}`}>
                                        <a style={{ color: '#000', fontSize: '14px' }}>
                                            {item.user.username}
                                        </a>
                                    </Link>
                                    <Rate allowHalf disabled defaultValue={item.score / 2} style={{ fontSize: '14px', marginBottom: '2px' }} />        
                                </Space>
                            }
                            avatar={<Avatar src={item.user.avatar} />}
                            content={
                                <p>{item.comment}</p>
                            }                           
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
        
export default MovieComments