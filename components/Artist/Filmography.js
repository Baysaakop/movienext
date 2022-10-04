import { Timeline, Select, Row, Col, Divider, List } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import api from "../../api"
import dayjs from 'dayjs'
import Link from "next/link"
import Loading from "../Loading"

const { Option } = Select

const Filmography = ({ artist }) => {
    const [data, setData] = useState([])
    const [role, setRole] = useState()

    useEffect(() => {        
        if (role === undefined) {
            setRole(artist.occupations[0].id)
        }        
        getFilmography()
    }, [artist, role]) // eslint-disable-next-line react-hooks/exhaustive-deps

    function getFilmography() {
        if (role) {
            if (role === 1) {
                axios({
                    method: 'GET',
                    url: `${api.moviecast}?artist=${artist.id}`
                })
                .then(res => {                                                                      
                    setData(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                axios({
                    method: 'GET',
                    url: `${api.moviecrew}?artist=${artist.id}&role=${role}`
                })
                .then(res => {                                                                       
                    setData(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })
            }     
        }              
    }

    function onRoleChange (id) {
        setRole(id)
    }

    return (
        <div style={{ marginTop: '24px' }}>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={6}>
                    <Select defaultValue={artist.occupations[0].id} style={{ width: '100%' }} onChange={onRoleChange}>                        
                        {artist.occupations.map(o => (
                            <Option key={o.id} value={o.id}>{o.name}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Divider />
            { data ? (
                <Timeline mode="left">
                    {data.map(item => (                        
                        <Timeline.Item key={item.id} label={dayjs(item.movie.releasedate).year()}>
                            <Link href={`/movies/${item.movie.id}`}>
                                <a style={{ color: '#000' }}>{item.movie.title}</a>
                            </Link>
                            {item.role_name ? <span> ({item.role_name})</span> : <></>}
                        </Timeline.Item>
                    ))}
                </Timeline>
            ) : (                
                <Loading />
            )} 
        </div>
    )
}

export default Filmography