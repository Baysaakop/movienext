import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'

const indicator = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '60vh' }}>
            <Spin indicator={indicator} />
        </div>
    )
}

export default Loading