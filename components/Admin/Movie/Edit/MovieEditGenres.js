import { Button, Form, message, Popconfirm } from 'antd'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import axios from 'axios'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import api from '../../../../api'

const MovieEditGenres = (props) => {
    const [form] = Form.useForm()
    const [genres, setGenres] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getGenres()
        getSelected()
    }, [])

    function getGenres () {
        axios({
            method: 'GET',
            url: api.genres
        })
        .then(res => {
            setGenres(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getSelected() {
        let array = []
        props.movie.genres.forEach(genre => {
            array.push(genre.id)
        })
        setSelected(array)
    }

    function handleChange (genre, checked) {
        const next = checked ? [...selected, genre] : selected.filter(g => g !== genre)
        setSelected(next)
    }

    function onFinish () {
        var formData = new FormData()    
        formData.append('genres', selected)
        axios({
            method: 'PUT',
            url: `${api.moviedetail}/${props.movie.id}/`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${props.token}`
            }
        })
        .then(res => {
            message.success(`Амжилттай хадгалагдлаа.`)
            Router.reload()          
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {genres.map(genre => (
                <CheckableTag
                    key={genre.id}
                    checked={selected.indexOf(genre.id) > -1}
                    onChange={checked => handleChange(genre.id, checked)}
                >
                    {genre.name}
                </CheckableTag>
            ))}
            <Popconfirm title="Хадгалах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={onFinish}>
                <Button block type='primary' style={{ marginTop: '16px' }}>Хадгалах</Button>
            </Popconfirm>
        </div>
    )
}

export default MovieEditGenres