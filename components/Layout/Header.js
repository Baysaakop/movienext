import { Button, Drawer, Grid, Input, Space } from 'antd'
import { MenuUnfoldOutlined, UserAddOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Menu from './Menu'
import Link from 'next/link'

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

    return (
        <div className={styles.header}>
            {screens.lg ? (
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
                        <Space size={8} wrap>
                            <Link href="/auth/login">
                                <a>
                                    <Button 
                                        type='ghost'
                                        size='large'
                                    >
                                        Нэвтрэх
                                    </Button>
                                </a>
                            </Link>
                            <Link href="/auth/register">
                                <a>
                                    <Button 
                                        type='primary'
                                        size='large'
                                    >
                                        Бүртгүүлэх
                                    </Button>
                                </a>
                            </Link>
                        </Space>
                    </div>
                </div>
            ) : (
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
                        <Link href="/auth/login">
                            <a>
                                <Button 
                                    type='ghost'
                                    size='large'
                                    icon={<UserAddOutlined />}
                                /> 
                            </a>                      
                        </Link>                             
                    </div>
                    <Drawer title="Үндсэн цэс" placement="left" onClose={hideMenu} visible={visible}>
                        <Menu />
                    </Drawer>
                </div>
            )}
        </div>
    )
}

export default Header