import React, { useState } from 'react'
import { Tooltip, Button } from 'antd'
import { ShareAltOutlined } from '@ant-design/icons'
import MovieShareModal from './MovieShareModal'

const MovieShareButton = (props) => {
    const [visible, setVisible] = useState(false)

    return (
        <Tooltip title="Хуваалцах" placement="top">
            <Button 
                size="large" 
                shape="circle" 
                type="text" 
                icon={<ShareAltOutlined />}   
                onClick={() => setVisible(true)}      
            />    
            {visible ? <MovieShareModal url={props.path} hide={() => setVisible(false)} /> : <></>}    
        </Tooltip>
    )
}

export default MovieShareButton