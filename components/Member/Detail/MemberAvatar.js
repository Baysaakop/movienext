import { Avatar } from 'antd'

const MemberAvatar = ({ member, size }) => {
    return (
        <div>
            {member.avatar ? 
                <Avatar size={size} src={member.avatar} />
            :
                <Avatar size={size} style={{ background: '#28202f' }}>
                    {member.username.charAt(0).toUpperCase()}
                </Avatar>                         
            }
        </div>
    )
}

export default MemberAvatar