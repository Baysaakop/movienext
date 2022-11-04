import { GlobalOutlined, FacebookFilled, InstagramFilled, YoutubeFilled, TwitterOutlined, MediumOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React from 'react'

const SocialMediaRow = ({ icon, href, text }) => {
    return (
        <div>
            <Space size={8} wrap>
                <Button size='small' type='text' icon={icon} />
                <Button size='small' type='link' href={href}>{text}</Button>
            </Space>
        </div>
    )
}

const SocialMedia = ({ member }) => {
    return (
        <div>
            <Typography.Title level={5}>Сошиал сувгууд</Typography.Title>
            { member.website ? (
                <SocialMediaRow icon={<GlobalOutlined />} href={member.website} text={member.website} />
            ) : (<></>)}            
            { member.facebook ? (
                <SocialMediaRow icon={<FacebookFilled />} href={member.facebook} text={new URL(member.facebook).pathname} />
            ) : <></>}     
            { member.instagram ? (
                <SocialMediaRow icon={<InstagramFilled />} href={member.instagram} text={new URL(member.instagram).pathname} />
            ) : <></>}        
            { member.youtube ? (
                <SocialMediaRow icon={<YoutubeFilled />} href={member.youtube} text={new URL(member.youtube).pathname} />
            ) : <></>}       
            { member.twitter ? (
                <SocialMediaRow icon={<TwitterOutlined />} href={member.twitter} text={new URL(member.twitter).pathname} />
            ) : <></>}  
            { member.medium ? (
                <SocialMediaRow icon={<MediumOutlined />} href={member.medium} text={new URL(member.medium).pathname} />
            ) : <></>}       
        </div>
    )
}

export default SocialMedia