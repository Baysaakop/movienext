import { Space, Avatar, Typography, Row, Col } from 'antd'
import styles from '../../../styles/Member/MemberDetail.module.css'
import MemberMovie from './MemberMovie'
import FollowButton from './FollowButton'
import GeneralStats from './GeneralStats'
import SocialMedia from './SocialMedia'
import Following from './Following'
import Followers from './Followers'
import MemberAverageScore from './MemberAverageScore'
import MemberAvatar from './MemberAvatar'

const MemberDetailDesktop = (props) => {    

    return (
        <div className={styles.memberDetail}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <div className={styles.container}>
                        <div className={styles.memberInfo}>
                            <Space size={8}>
                                <MemberAvatar member={props.member} size={64} />
                                <div>
                                    <Typography.Title level={4} style={{ margin: 0 }}>{props.member.username}</Typography.Title>                            
                                    <Typography.Text italic>{props.member.biography}</Typography.Text>
                                </div>                                             
                            </Space>
                            <FollowButton member={props.member} />    
                        </div>                
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.container}>                
                        <SocialMedia member={props.member} />
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.container}>                
                        <GeneralStats member={props.member} />
                    </div>
                </Col>
                <Col span={12}> 
                    <div className={styles.container}>                
                        {/* <MemberAverageScore member={props.member} /> */}
                    </div>
                </Col>
                <Col span={12}> 
                    <div className={styles.container}>                         
                        <Following member={props.member} />
                    </div>
                </Col>
                <Col span={12}> 
                    <div className={styles.container}>                              
                        <Followers member={props.member} />
                    </div>
                </Col>
            </Row>                                                            
            <MemberMovie member={props.member} />            
        </div>
    )
}

export default MemberDetailDesktop