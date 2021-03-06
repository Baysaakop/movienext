import { HeartOutlined } from "@ant-design/icons"
import { Button, message, notification, Tooltip } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"

const MovieLikeButton = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        if (props.user && user === undefined) {
            setUser(props.user)
        }
    }, [props.user]) // eslint-disable-next-line react-hooks/exhaustive-deps
 
    function onAdd() {
        if (props.token) {
            axios({
                method: 'PUT',
                url: `${api.userdetail}/${user.id}/`,
                data: {
                    movie: props.movie.id,
                    like: true
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(res => {
                setUser(res.data)
                notification['success']({
                    message: 'Мэдэгдэл',
                    description: `"${props.movie.title}" таны таалагдсан киноны жагсаалтад нэмэгдлээ.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `"${props.movie.title}" кино-г нэмэх үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }        
        props.onBlur()
    }

    function onRemove() {
        if (props.token) {
            axios({
                method: 'PUT',
                url: `${api.userdetail}/${user.id}/`,
                data: {
                    movie: props.movie.id,
                    like: true
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`
                }
            })
            .then(res => {
                setUser(res.data)
                notification['info']({
                    message: 'Мэдэгдэл',
                    description: `"${props.movie.title}" таны таалагдсан киноны жагсаалтаас хасагдлаа.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `"${props.movie.title}" кино-г хасах үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }        
        props.onBlur()
    }

    if (user) {
        if (user.movies_like.length > 0) {
            if (user.movies_like.filter(x => x.id === props.movie.id).length > 0) {
                return (
                    <Tooltip title="Таалагдаагүй" placement={props.placement}>
                        <Button 
                            size="large" 
                            shape="circle" 
                            type="primary" 
                            icon={<HeartOutlined />}   
                            onClick={onRemove}      
                            style={{ background: '#ff5252', border: 0 }}
                        />
                    </Tooltip>
                )
            }
        }
    }    
    return (
        <Tooltip title="Таалагдсан" placement={props.placement}>
            <Button 
                size="large" 
                shape="circle" 
                type="text" 
                icon={<HeartOutlined />}   
                onClick={onAdd}      
            />        
        </Tooltip>
    )
}

export default MovieLikeButton