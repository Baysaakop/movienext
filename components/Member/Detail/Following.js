import { List, Space, Typography } from 'antd'
import MemberAvatar from './MemberAvatar'
import styles from '../../../styles/Member/MemberDetail.module.css'
import Link from 'next/link'

const Following = ({ member }) => {    
    return (
        <div className={styles.following}>
            <List
                itemLayout='horizontal'
                size='small'
                dataSource={member.following}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<MemberAvatar member={item} size={32} />}
                            title={
                                <Link href={`/members/${item.id}`}>
                                    <a className={styles.username}>
                                        {item.username}
                                    </a>
                                </Link>
                            }                            
                        />
                        <div>Follow</div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Following