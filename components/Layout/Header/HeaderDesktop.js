import { Avatar, Button, Input, Dropdown, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import AvatarDropDown from './AvatarDropDown'
import styles from '../../../styles/Layout/Header/HeaderDesktop.module.css'

const { Search } = Input

const HeaderDesktop = () => {

    const { data: session, status } = useSession()     
 
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Link href="/">
                    <div className={styles.logo}>
                        MOVIE+
                    </div>
                </Link>
                <div>
                    <Search 
                        allowClear
                        placeholder='Хайлт...' 
                        size='large'
                        style={{ width: '300px' }}
                    />
                </div>
            </div>
            <div className={styles.right}>
                { status === "loading" ?
                    <Avatar size="large" />
                : status === "authenticated" ?
                    <Space size={16} wrap>
                        {session.role === 1 ? (
                            <Link href="/admin">
                                <a>
                                    <Button type='ghost' size='large' icon={<SettingOutlined />} />
                                </a>
                            </Link>
                        ) : (
                            <></>
                        )}
                        <Dropdown overlay={<AvatarDropDown id={session.id} />} placement="bottomRight" trigger={['click']}>
                            <a>
                                {session.avatar ?
                                    <Avatar                                            
                                        src={session.avatar}
                                        size="large"
                                    />        
                                :
                                    <Avatar size="large" style={{ background: '#28202f' }}>
                                        {session.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                }                                                                                          
                            </a>      
                        </Dropdown>
                    </Space>
                :
                    <Button 
                        type='ghost'
                        size='large'
                        onClick={() => signIn()}
                    >
                        Нэвтрэх
                    </Button>
                }                        
            </div>
        </div>
    )    
}

export default HeaderDesktop