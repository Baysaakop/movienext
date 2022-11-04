import { Avatar, Button, Drawer, Dropdown } from 'antd'
import { CloseOutlined, MenuOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import SideMenu from '../SideMenu'
import AvatarDropDown from './AvatarDropDown'
import styles from '../../../styles/Layout/Header/HeaderMobile.module.css'

const HeaderMobile = () => {
    const [visible, setVisible] = useState(false)

    const showMenu = () => {
        setVisible(true)
    }

    const hideMenu = () => {
        setVisible(false)
    }

    const { data: session, status } = useSession()       
 
    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Button                    
                    type='text'
                    size='large'  
                    shape='circle'
                    icon={visible ? <CloseOutlined /> : <MenuOutlined />}                 
                    onClick={() => setVisible(!visible)}                            
                />
            </div>
            <div className={styles.mid}>
                <Link href="/">
                    <a>
                        <div className={styles.logo}>
                            MOVIE+
                        </div>      
                    </a>                    
                </Link>
            </div>
            <div className={styles.right}>
                { status === "loading" ?
                    <Avatar size="large" />
                : status === "authenticated" ?
                    <Dropdown overlay={<AvatarDropDown id={session.id} />} placement="bottomRight">
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
            <Drawer placement="left" visible={visible}>
                <div style={{ padding: '40px 16px 16px 16px' }}>
                    <SideMenu onHide={hideMenu} />
                </div>
            </Drawer>
        </div>
    )  
}

export default HeaderMobile