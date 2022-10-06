import { Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import api from '../../../../api'

const MovieEditPlatforms = (props) => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        getPlatforms()
    }, [])

    function getPlatforms () {
        axios({
            method: 'GET',
            url: api.platforms
        })
        .then(res => {
            setPlatforms(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }    

    function getUrl (id) {  
        let item = props.movie.platforms.find(x => x.platform.id === id)
        if (item && item !== null) {
            return item.url
        } else {
            return ""
        }
    }

    function onSave (value, id) {
        var formData = new FormData()    
        formData.append('platform', id)
        formData.append('url', value)
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
            {platforms.map(platform => (
                <Input.Search 
                    key={platform.id}                    
                    addonBefore={
                        <img alt={platform.id} src={platform.logo} style={{ width: '32px', height: 'auto' }} />
                    }
                    placeholder="URL"
                    defaultValue={getUrl(platform.id)} 
                    enterButton="Хадгалах"                     
                    size="large"
                    style={{ marginTop: '16px' }}                    
                    onSearch={(val) => onSave(val, platform.id)} 
                />
            ))}           
        </div>
    )
}

export default MovieEditPlatforms