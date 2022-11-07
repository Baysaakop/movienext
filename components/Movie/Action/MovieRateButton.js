import { StarOutlined } from "@ant-design/icons"
import { Button, message, notification, Popover, Rate } from "antd"
import axios from "axios"
import api from "../../../api"

const MovieRateButton = (props) => {

    function onRate (val) {
        if (props.session) {
            let method = 'POST'
            let url = `${api.movielogs}/`
            let data = {
                movie: props.movie.id,
                user: props.session.id,
                score: val * 2
            }            
            if (props.log) {
                method = 'PUT'
                url = `${api.movielogs}/${props.log.id}/`
                data = {             
                    score: val * 2
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
                    description: `"${res.data.movie.title}" киноны үнэлгээ өөрчлөгдлөө.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `Киног нэмэх үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })                       
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }                
    }

    if (props.log) {
        if (props.log.score > 0) {
            return (
                <Popover                                
                    placement="right"
                    title={<strong>Таны үнэлгээ: {props.log.score / 2}</strong>}
                    trigger="click"
                    content={
                        <div>
                            <Rate defaultValue={props.log.score / 2} allowHalf count={5} onChange={onRate} />
                        </div>
                    }
                >
                    <Button 
                        className="like" 
                        size={props.size}
                        shape="circle" 
                        type="primary"                             
                        style={{ background: '#fdcc0d', border: 0, color: '#000', fontSize: '14px', fontWeight: 'bold' }}   
                    >
                        {props.log.score / 2}
                    </Button>
                </Popover>
            )
        }
    }
    return (
        <Popover                                
            placement="right"
            title={<strong>Үнэлгээ өгөх:</strong>}
            trigger="click"
            content={
                <div>
                    <Rate allowHalf count={5} onChange={onRate} />
                </div>
            }
        >
            <Button 
                className="like" 
                size={props.size}
                shape="circle" 
                type="text" 
                icon={<StarOutlined />}         
            />
        </Popover>
    )      
}

export default MovieRateButton