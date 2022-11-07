import { CheckOutlined } from "@ant-design/icons"
import { Button, message, notification, Tooltip } from "antd"
import axios from "axios"
import api from "../../../api"

const MovieWatchedButton = (props) => {      

    function onAdd() {
        if (props.session) {
            let method = 'POST'
            let url = `${api.movielogs}/`
            let data = {
                movie: props.movie.id,
                user: props.session.id,
                watched: true
            }
            if (props.log) {
                method = 'PUT'
                url = `${api.movielogs}/${props.log.id}/`
                data = {
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
                props.updateLog(res.data)
                notification['success']({
                    message: 'Мэдэгдэл',
                    description: `"${res.data.movie.title}" таны үзсэн киноны жагсаалтад нэмэгдлээ.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `Киног киног нэмэх үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })                       
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }             
    }

    function onRemove() {
        if (props.session) {
            axios({
                method: 'PUT',
                url: `${api.movielogs}/${props.log.id}/`,
                data: {                    
                    watched: false
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.session.token}`
                }
            })
            .then(res => {
                props.updateLog(res.data)
                notification['info']({
                    message: 'Мэдэгдэл',
                    description: `"${res.data.movie.title}" таны үзсэн киноны жагсаалтаас хасагдлаа.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `Киног хасах үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд нэвтрэх шаардлагатай.")            
        }        
    }

    if (props.log) {
        if (props.log.watched) {
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