import { Button, message, Popconfirm } from 'antd'
import CheckableTag from 'antd/lib/tag/CheckableTag'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../../api'

const ArtistEditOccupations = (props) => {
    const [occupations, setOccupations] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getOccupations()
        getSelected()
    }, [])

    function getOccupations () {
        axios({
            method: 'GET',
            url: api.occupations
        })
        .then(res => {
            setOccupations(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function getSelected() {
        let array = []
        props.artist.occupations.forEach(o => {
            array.push(o.id)
        })
        setSelected(array)
    }

    function handleChange (o, checked) {
        const next = checked ? [...selected, o] : selected.filter(s => s !== o)
        setSelected(next)
    }

    function onFinish () {
        var formData = new FormData()    
        formData.append('occupations', selected)
        axios({
            method: 'PUT',
            url: `${api.artistdetail}/${props.artist.id}/`,
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
            {occupations.map(o => (
                <CheckableTag
                    key={o.id}
                    checked={selected.indexOf(o.id) > -1}
                    onChange={checked => handleChange(o.id, checked)}
                >
                    {o.name}
                </CheckableTag>
            ))}
            <Popconfirm title="Хадгалах уу?" okText="Тийм" cancelText="Үгүй" onConfirm={onFinish}>
                <Button block type='primary' style={{ marginTop: '16px' }}>Хадгалах</Button>
            </Popconfirm>
        </div>
    )
}

export default ArtistEditOccupations