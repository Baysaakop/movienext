import { CheckOutlined } from "@ant-design/icons"
import { Button, message, notification, Tooltip } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"

const MovieWatchedButton = (props) => {      
    const [log, setLog] = useState()

    useEffect(() => {
        if (props.logs) {
            let filtered = props.logs.filter(x => x.movie.id === props.movie.id)
            if (filtered.length > 0) {
                setLog(filtered[0])
            }
        }        
    }, [props.logs]) // eslint-disable-next-line react-hooks/exhaustive-deps

    function onAdd() {
        if (props.session) {
            let method = 'POST'
            let url = `${api.movielogs}/`
            let data = {
                watched: true
            }
            if (log) {
                method = 'PUT'
                url = `${api.movielogs}/${log.id}/`
                data = {
                    movie: props.movie.id,
                    user: props.session.id,
                    watched: true
                }
            }
            axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.session.token}`
                }
            })
            .then(res => {
                setLog(res.data)
                notification['success']({
                    message: 'Мэдэгдэл',
                    description: `"${log.movie.title}" таны үзсэн киноны жагсаалтад нэмэгдлээ.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `"${log.movie.title}" кино-г нэмэх үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })                       
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }        
        props.onBlur()
    }

    function onRemove() {
        if (props.session) {
            axios({
                method: 'PUT',
                url: `${api.movielogs}/${log.id}/`,
                data: {                    
                    watched: false
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.session.token}`
                }
            })
            .then(res => {
                setLog(res.data)
                notification['info']({
                    message: 'Мэдэгдэл',
                    description: `"${log.movie.title}" таны үзсэн киноны жагсаалтаас хасагдлаа.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `"${log.movie.title}" кино-г хасах үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд нэвтрэх шаардлагатай.")            
        }        
        props.onBlur()
    }

    if (log) {
        if (log.watched) {
            return (
                <Tooltip title="Үзсэн" placement={props.placement}>
                    <Button 
                        size={props.size}
                        shape="circle" 
                        type="primary" 
                        icon={<CheckOutlined />}   
                        onClick={onRemove}      
                        style={{ background: '#44bd32', border: 0 }}
                    />
                </Tooltip>
            )
        }
    }
    return (
        <Tooltip title="Үзсэн" placement={props.placement}>
            <Button 
                size={props.size}
                shape="circle" 
                type="text" 
                icon={<CheckOutlined />}   
                onClick={onAdd}      
            />        
        </Tooltip>
    )        
}

export default MovieWatchedButton