import { Grid, Avatar, Button, Drawer, Input, Dropdown, Menu as AntMenu, Skeleton, Space } from 'antd'
import { MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import Menu from './Menu'
import styles from '../../styles/Header.module.css'

const { useBreakpoint } = Grid
const { Search } = Input

const Header = () => {
    const screens = useBreakpoint()
    const [visible, setVisible] = useState(false)

    const showMenu = () => {
        setVisible(true)
    }

    const hideMenu = () => {
        setVisible(false)
    }

    const { data: session, status } = useSession()

    const menu = (
        <AntMenu
            items={[
                {
                    label: 
                    <Link href={`/members/${session.id}`}>
                        <a>
                            <Button type="text">Профайл</Button>
                        </a>
                    </Link>,
                    key: '0',
                },
                {
                    label: 
                    <Link href="/settings">
                        <a>
                            <Button type="text">Миний бүртгэл</Button>
                        </a>
                    </Link>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: <Button danger type='link' onClick={() => signOut()}>Гарах</Button>,
                    key: '3',
                },
            ]}
        />
    )    
 
    if (screens) {
        if (screens.lg) {
            return (
                <div className={styles.header}>
                    <div className={styles.desktop}>
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
                                <Skeleton loading active avatar>
                                </Skeleton>
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
                                    <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
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
                </div>
            )
        } else {
            return (
                <div className={styles.header}>
                    <div className={styles.mobile}>
                        <div className={styles.left}>
                            <Button
                                type='ghost'
                                size='large'  
                                icon={<MenuUnfoldOutlined />}  
                                onClick={showMenu}                            
                            />
                        </div>
                        <div className={styles.mid}>
                            <Link href="/">
                                <div className={styles.logo}>
                                    MOVIE+
                                </div>      
                            </Link>
                        </div>
                        <div className={styles.right}>
                            { status === "loading" ?
                                <Skeleton loading active avatar>
                                </Skeleton>
                            : status === "authenticated" ?
                                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
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
                            :
                                <Button 
                                    type='ghost'
                                    size='large'
                                    icon={<UserOutlined />}
                                    onClick={() => signIn()}
                                />                                    
                            }                        
                        </div>
                        <Drawer title="Үндсэн цэс" placement="left" onClose={hideMenu} visible={visible}>
                            <div style={{ padding: '16px' }}>
                                <Menu onHide={hideMenu} />
                            </div>
                        </Drawer>
                    </div>
                </div>
            )
        }   
    } else {
        return (
            <Skeleton active />
        )
    }    
}

export default Header