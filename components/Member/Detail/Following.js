import { List, Space, Typography } from 'antd'
import MemberAvatar from './MemberAvatar'
import styles from '../../../styles/Member/MemberDetail.module.css'
import Link from 'next/link'
import FollowButton from './FollowButton'

const Following = ({ member }) => {    
    return (
        <div className={styles.following}>
            <Typography.Title level={5}>Дагаж буй ({member.following.length})</Typography.Title>       
            <List
                itemLayout='horizontal'
                size='small'
                pagination={{ pageSize: 20, size: 'small' }}
                dataSource={member.following}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={
                                <Link href={`/members/${item.id}`}>
                                    <a>
                                        <MemberAvatar member={item} size={32} />
                                    </a>
                                </Link>
                            }
                            title={
                                <Link href={`/members/${item.id}`}>
                                    <a className={styles.username}>
                                        {item.username}
                                    </a>
                                </Link>
                            }                            
                        />
                        <FollowButton member={item} />    
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Following