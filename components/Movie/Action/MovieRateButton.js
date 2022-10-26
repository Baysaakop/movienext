import { StarOutlined } from "@ant-design/icons"
import { Button, message, notification, Popover, Rate } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../../api"

const MovieRateButton = (props) => {
    const [user, setUser] = useState()

    useEffect(() => {
        if (props.user && user === undefined) {
            setUser(props.user)
        }
    }, [props.user]) // eslint-disable-next-line react-hooks/exhaustive-deps

    function onRate (val) {
        if (props.token) {
            axios({
                method: 'PUT',
                url: `${api.userdetail}/${user.id}/`,
                data: {
                    movie: props.movie.id,
                    score: (val * 2)
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
                    description: `"${props.movie.title}" кинонд өгсөн таны үнэлгээг хүлээж авлаа.`
                })
            })
            .catch(err => {
                console.log(err)
                notification['error']({
                    message: 'Алдаа',
                    description: `"${props.movie.title}" кинонд үнэлгээ өгөх үед алдаа гарлаа. Та хуудсыг refresh хийгээд дахин оролдоно уу.`
                })
            })
        } else {
            message.warning("Энэ үйлдлийг хийхийн тулд та нэвтэрсэн байх шаардлагатай.")            
        }        
    }

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
                            size="large" 
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
                size="large" 
                shape="circle" 
                type="text" 
                icon={<StarOutlined />}         
            />
        </Popover>
    )    
}

export default MovieRateButton