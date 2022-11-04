import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import api from '../../../api'
import { TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { message, notification, Popconfirm, Button } from 'antd'

const FollowButton = (props) => {

    const [user, setUser] = useState()

    const { data: session, status } = useSession()

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function isFollowing (user, member) {        
        if (user) {
            if (user.following.filter(x => x.id === member.id).length > 0) {
                return true
            }
        }        
        return false
    }

    function handleFollow (member, follow) {
        if (user) {
            axios({
                method: 'PUT',
                url: `${api.userdetail}/${session.id}/`,
                data: {
                    member: member.id,
                    follow: true
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${session.token}`
                }
            })
            .then(res => {                        
                setUser(res.data)
                if (follow === true) {
                    notification['success']({
                        message: 'Мэдэгдэл',
                        description: `"${member.username}" хэрэглэгчийг дагалаа.`
                    })
                } else {
                    notification['warning']({
                        message: 'Мэдэгдэл',
                        description: `"${member.username}" хэрэглэгчийг дагахаа болилоо.`
                    })
                }               
            })
            .catch(err => {
                message.error("Алдаа гарлаа. Дахин оролдоно уу.")
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд нэвтрэх шаардлагатай.")
        }
    }

    return (
        <div>
            { isFollowing(user, props.member) ? (
                <Popconfirm title="Дагахаа болих уу?" onConfirm={() => handleFollow(props.member, false)} okText="Тийм" cancelText="Үгүй">
                    <Button                                                                               
                        shape='round' 
                        type='primary'     
                        icon={<TeamOutlined />} 
                    />
                </Popconfirm>
            ) : user && user.id === props.member.id ? (
                <></>
            ) : (
                <Popconfirm title="Дагах уу?" onConfirm={() => handleFollow(props.member, true)} okText="Тийм" cancelText="Үгүй">
                    <Button                                                     
                        shape='round' 
                        type='dashed'
                        icon={<UsergroupAddOutlined />}                         
                    />
                </Popconfirm>
            )}                     
        </div>
    )
}

export default FollowButton