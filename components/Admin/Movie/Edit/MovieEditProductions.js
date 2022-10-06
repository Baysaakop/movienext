import { Button, message, Popconfirm } from 'antd'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../../api'

const MovieEditProductions = (props) => {
    const [productions, setProductions] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getProductions()
        getSelected()
    }, [])

    function getProductions () {
        axios({
            method: 'GET',
            url: api.productions
        })
        .then(res => {
            setProductions(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getSelected() {
        let array = []
        props.movie.productions.forEach(production => {
            array.push(production.id)
        })
        setSelected(array)
    }

    function handleChange (production, checked) {
        const next = checked ? [...selected, production] : selected.filter(p => p !== production)
        setSelected(next)
    }

    function onFinish () {
        var formData = new FormData()    
        formData.append('productions', selected)
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
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {productions.map(production => (
                <CheckableTag
                    key={production.id}
                    checked={selected.indexOf(production.id) > -1}
                    onChange={checked => handleChange(production.id, checked)}
                >
                    {production.name}
                </CheckableTag>
            ))}
            <Popconfirm title="Хадгалах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={onFinish}>
                <Button block type='primary' style={{ marginTop: '16px' }}>Хадгалах</Button>
            </Popconfirm>
        </div>
    )
}

export default MovieEditProductions