import { ArrowUpOutlined } from '@ant-design/icons'
import { Statistic } from 'antd'
import React from 'react'

const HomeStats = () => {
    return (
        <div style={{ margin: '24px 0', borderRadius: '4px', background: '#fff', height: '160px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div><Statistic title="Кино" value="300" prefix={<ArrowUpOutlined />} /></div>
            <div><Statistic title="Уран бүтээлч" value="1200" prefix={<ArrowUpOutlined />} /></div>
            <div><Statistic title="Хэрэглэгч" value="47K" prefix={<ArrowUpOutlined />} /></div>
        </div>        
    )
}

export default HomeStats