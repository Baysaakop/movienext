import { Space, Avatar, Typography } from 'antd'
import styles from '../../../styles/Member/MemberDetail.module.css'
import MemberMovie from './MemberMovie'
import FollowButton from './FollowButton'
import GeneralStats from './GeneralStats'
import SocialMedia from './SocialMedia'
import Following from './Following'
import Followers from './Followers'

const MemberDetailMobile = (props) => {    

    return (
        <div className={styles.memberDetail}>
            <div className={styles.container}>
                <div className={styles.memberInfo}>
                    <Space size={8}>
                        {props.member.avatar ? 
                            <Avatar size={48} src={props.member.avatar} />
                        :
                            <Avatar size={48} style={{ background: '#28202f' }}>
                                {props.member.username.charAt(0).toUpperCase()}
                            </Avatar>                         
                        }
                        <div>
                            <Typography.Title level={5} style={{ margin: 0 }}>{props.member.username}</Typography.Title>                            
                            <Typography.Text italic>{props.member.biography}</Typography.Text>
                        </div>                                             
                    </Space>
                    <FollowButton member={props.member} />    
                </div>                
            </div>
            <div className={styles.container}>                
                <SocialMedia member={props.member} />
            </div>
            <div className={styles.container}>                
                <GeneralStats member={props.member} />
            </div>
            <MemberMovie member={props.member} />
            <div className={styles.container}>         
                <Typography.Title level={5}>Дагаж буй</Typography.Title>       
                <Following member={props.member} />
            </div>
            <div className={styles.container}>              
                <Typography.Title level={5}>Дагагчид</Typography.Title>         
                <Followers member={props.member} />
            </div>
        </div>
    )
}

export default MemberDetailMobile