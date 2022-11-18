import { HeartOutlined } from '@ant-design/icons'
import { Modal, Input, Button, Checkbox, message, DatePicker, Row, Col, Rate, notification } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import api from '../../../api'

const MovieLogModal = (props) => {    
    const [visible, setVisible] = useState(true)
    const [date, setDate] = useState()
    const [score, setScore] = useState(0)
    const [like, setLike] = useState(false)
    const [comment, setComment] = useState("")
    const [spoiler, setSpoiler] = useState(false)

    useEffect(() => {
        if (props.log) {
            if (props.log.watched_at !== null && props.log.watched_at !== undefined) {
                setDate(moment(props.log.watched_at).format("YYYY-MM-DD"))
            }            
            if (props.log.score) {
                setScore(props.log.score / 2)
            }            
            setLike(props.log.like)
            setComment(props.log.comment)
            setSpoiler(props.log.spoiler_alert)
        }
    }, [props.log])

    function onChangeDate (value) {        
        if (value === null) {
            setDate(undefined)
        } else {
            setDate(moment(value).format("YYYY-MM-DD"))
        }
    }

    function onChangeScore (value) {
        setScore(value)
    }

    function onChangeLike() {
        setLike(!like)
    }

    function onChangeComment(e) {
        setComment(e.target.value)
    }

    function onChangeSpoiler() {
        setSpoiler(!spoiler)
    }

    function onFinish () {        
        if (props.session) {
            let method = 'POST'
            let url = `${api.movielogs}/`
            let data = {
                movie: props.movie.id,
                user: props.session.id,
                watched: true,
                like: like,
                score: score * 2,
                watched_at: date ? moment(date).format("YYYY-MM-DD") : null,
                comment: comment ? comment : null,
                spoiler_alert: spoiler
            }
            if (props.log) {
                method = 'PUT'
                url = `${api.movielogs}/${props.log.id}/`
                data = {
                    watched: true,
                    like: like,
                    score: score * 2,
                    watched_at: date ? moment(date).format("YYYY-MM-DD") : null,
                    comment: comment ? comment : null,
                    spoiler_alert: spoiler
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
                    description: `"${res.data.movie.title}" кино таны бүртгэлд нэмэгдлээ.`
                })
                setVisible(false)
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

    return (
        <div>
            <Modal                
                className="log"
                centered
                visible={visible}
                footer={null}
                onCancel={() => props.onHide()}
                title={props.movie.title}
                style={{ padding: 0 }}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={10}>
                        <p style={{ marginBottom: '4px' }}>Үзсэн өдөр</p>
                        <DatePicker format={"YYYY-MM-DD"} value={date ? moment(date) : undefined} style={{ width: '100%' }} onChange={onChangeDate}  />
                    </Col>                            
                    <Col xs={16} sm={10}>
                        <p style={{ marginBottom: '4px' }}>Үнэлгээ</p>
                        <Rate allowHalf count={5} value={score} onChange={onChangeScore} />
                    </Col>
                    <Col xs={8} sm={4} style={{ textAlign: 'center' }}>
                        <Button
                            size='large'
                            shape='circle'
                            type={like === true ? 'primary' : 'text'}
                            icon={<HeartOutlined />}
                            style={like === true ? { background: '#ff5252', border: 0, marginTop: '16px' } : { marginTop: '16px' }}
                            onClick={onChangeLike}
                        />
                    </Col>
                    <Col span={24}>
                        <p style={{ marginBottom: '4px' }}>Сэтгэгдэл</p>
                        <Input.TextArea rows={4} value={comment} onChange={onChangeComment} />
                    </Col>
                    <Col span={16}>
                        <Checkbox checked={spoiler} onChange={onChangeSpoiler}>Spoiler агуулсан</Checkbox>
                    </Col>
                    <Col span={8}>                        
                        <Button block type='primary' onClick={onFinish}>Хадгалах</Button>
                    </Col>
                </Row>                                
            </Modal>
        </div>
    )
}

export default MovieLogModal