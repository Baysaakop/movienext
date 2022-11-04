import { StarOutlined } from "@ant-design/icons"
import { Button, message, notification, Popover, Rate } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"

const MovieRateButton = (props) => {
    const [log, setLog] = useState()

    useEffect(() => {
        if (props.logs) {
            let filtered = props.logs.filter(x => x.movie.id === props.movie.id)
            if (filtered.length > 0) {
                setLog(filtered[0])
            }
        }        
    }, [props.logs]) // eslint-disable-next-line react-hooks/exhaustive-deps

    function onRate (val) {
        if (props.session) {
            let method = 'POST'
            let url = `${api.movielogs}/`
            let data = {
                score: val * 2
            }
            if (log) {
                method = 'PUT'
                url = `${api.movielogs}/${log.id}/`
                data = {
                    movie: props.movie.id,
                    user: props.session.id,
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
                setLog(res.data)
                notification['success']({
                    message: 'Мэдэгдэл',
                    description: `"${log.movie.title}" киноны үнэлгээ өөрчлөгдлөө.`
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
    }

    if (log) {
        if (log.score > 0) {
            return (
                <Popover                                
                    placement="right"
                    title={<strong>Таны үнэлгээ: {log.score / 2}</strong>}
                    trigger="click"
                    content={
                        <div onMouseDown={() => props.onMouseDown()}>
                            <Rate defaultValue={log.score / 2} allowHalf count={5} onChange={onRate} />
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
                        {log.score / 2}
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
                <div onMouseDown={() => props.onMouseDown()}>
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

    if (user) {
        if (user.movies_rated.length > 0) {
            if (user.movies_rated.filter(x => x.movie.id === props.movie.id).length > 0) {
                return (
                    <Popover                                
                        placement="right"
                        title={<strong>Таны үнэлгээ: {user.movies_rated.find(x => x.movie.id === props.movie.id).score / 2}</strong>}
                        trigger="click"
                        content={
                            <div onMouseDown={() => props.onMouseDown()}>
                                <Rate defaultValue={user.movies_rated.find(x => x.movie.id === props.movie.id).score / 2} allowHalf count={5} onChange={onRate} />
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
                            {user.movies_rated.find(x => x.movie.id === props.movie.id).score / 2}
                        </Button>
                    </Popover>
                )
            }
        }
    }    
    return (
        <Popover                                
            placement="right"
            title={<strong>Үнэлгээ өгөх:</strong>}
            trigger="click"
            content={
                <div onMouseDown={() => props.onMouseDown()}>
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