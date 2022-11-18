import { HeartOutlined, MessageOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Comment, Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import MemberAvatar from '../../../Member/Detail/MemberAvatar'

const MovieReview = ({ item }) => {

    const actions = [
        <Tooltip key="like" title="Like">
            <Button type='text' size='small' icon={<HeartOutlined />}> {item.like_count}</Button>
        </Tooltip>,
        <Tooltip key="reply" title="Reply">
            <Button type='text' size='small' icon={<MessageOutlined />}> {item.comment_count}</Button>
        </Tooltip>,
    ]

    if (item.score > 0) {
        return (
            <Badge.Ribbon text={`⭐${item.score / 2}`} color="#28202F">
                <Card             
                    size="small"                                                                                                                                                                       
                >
                    <Comment
                        actions={actions}
                        author={
                            <div style={{ color: '#000', fontSize: '13px', fontWeight: 'bold' }}>{item.user.username}</div>
                        }
                        avatar={<MemberAvatar member={item.user} size={40} />}
                        content={
                            <p style={{ width: '100%' }}>{item.comment}</p>
                        }
                        datetime={moment(item.timestamp).fromNow()}
                        style={{ width: '100%' }}
                    />    
                </Card>       
            </Badge.Ribbon>           
        )
    }
    return (
        <Card             
            size="small"                                                                                                                                                                       
        >
            <Comment
                actions={actions}
                author={
                    <div style={{ color: '#000', fontSize: '13px', fontWeight: 'bold' }}>{item.user.username}</div>
                }
                avatar={<MemberAvatar member={item.user} size={40} />}
                content={
                    <p style={{ width: '100%' }}>{item.comment}</p>
                }
                datetime={moment(item.timestamp).fromNow()}
                style={{ width: '100%' }}
            />    
        </Card>         
    )
}

export default MovieReview