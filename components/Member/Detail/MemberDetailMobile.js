import { Space, Avatar, Typography } from 'antd'
import styles from '../../../styles/Member/MemberDetail.module.css'
import MemberMovie from './MemberMovie'
import FollowButton from './FollowButton'
import GeneralStats from './GeneralStats'
import SocialMedia from './SocialMedia'
import Following from './Following'
import Followers from './Followers'
import MemberAverageScore from './MemberAverageScore'
import MemberAvatar from './MemberAvatar'

const MemberDetailMobile = (props) => {    

    return (
        <div className={styles.memberDetail}>
            <div className={styles.container}>
                <div className={styles.memberInfo}>
                    <Space size={8}>
                        <MemberAvatar member={props.member} size={48} />
                        <div>
                            <Typography.Title level={4} style={{ margin: 0 }}>{props.member.username}</Typography.Title>                            
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
                <MemberAverageScore member={props.member} />
            </div>
            <div className={styles.container}>                
                <GeneralStats member={props.member} />
            </div>
            <div className={styles.container}>                         
                <Following member={props.member} />
            </div>
            <div className={styles.container}>                              
                <Followers member={props.member} />
            </div>
            <MemberMovie member={props.member} />            
        </div>
    )
}

export default MemberDetailMobile