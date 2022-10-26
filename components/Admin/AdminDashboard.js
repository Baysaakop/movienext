import React, { useState } from 'react'
import { Menu} from 'antd'
import styles from '../../styles/Admin.module.css'
import { UserOutlined, DesktopOutlined, LaptopOutlined, ReadOutlined, PlusSquareOutlined, EditOutlined, PlayCircleOutlined } from '@ant-design/icons'
import MovieCreate from './Movie/MovieCreate'
import MovieUpdate from './Movie/MovieUpdate'
import MovieCastEdit from './Movie/MovieCastEdit'
import MovieCrewEdit from './Movie/MovieCrewEdit'
import ArtistCreate from './Artist/ArtistCreate'
import ArtistUpdate from './Artist/ArtistUpdate'
import ArtistCastEdit from './Artist/ArtistCastEdit'
import ArtistCrewEdit from './Artist/ArtistCrewEdit'
import MoviePlatformEdit from './Movie/MoviePlatformEdit'
import ArticleCreate from './Article/ArticleCreate'

const modelItems = [
    {
        label: 'Кино',
        key: 'movies',
        icon: <DesktopOutlined />
    },
    {
        label: 'ТВ Цуврал',
        key: 'series',
        icon: <LaptopOutlined />
    },
    {
        label: 'Уран бүтээлч',
        key: 'artists',
        icon: <UserOutlined />
    },
    {
        label: 'Нийтлэл',
        key: 'articles',
        icon: <ReadOutlined />
    }
]

const moviesItems = [
    {
        label: 'Кино нэмэх',
        key: 'create',
        icon: <PlusSquareOutlined />
    },
    {
        label: 'Кино засах / устгах',
        key: 'update',
        icon: <EditOutlined />
    },
    {
        label: 'Жүжигчид',
        key: 'cast',
        icon: <UserOutlined />
    },
    {
        label: 'Баг бүрэлдэхүүн',
        key: 'crew',
        icon: <UserOutlined />
    },
    {
        label: 'Үзэх суваг',
        key: 'platform',
        icon: <PlayCircleOutlined />
    }
]

const artistsItems = [
    {
        label: 'Уран бүтээлч нэмэх',
        key: 'create',
        icon: <PlusSquareOutlined />
    },
    {
        label: 'Уран бүтээлч засах',
        key: 'update',
        icon: <EditOutlined />
    },
    {
        label: 'Жүжигчид',
        key: 'cast',
        icon: <UserOutlined />
    },
    {
        label: 'Баг бүрэлдэхүүн',
        key: 'crew',
        icon: <UserOutlined />
    }
]

const articlesItems = [
    {
        label: 'Нийтлэл оруулах',
        key: 'create',
        icon: <PlusSquareOutlined />
    },
    {
        label: 'Нийтлэл засах',
        key: 'update',
        icon: <EditOutlined />
    },
]

const AdminDashboard = ({ token }) => {    
    
    const [model, setModel] = useState('movies')
    const [action, setAction] = useState('create')

    function onSelectModel (e) {
        setModel(e.key)
    }

    function onSelectAction (e) {
        setAction(e.key)
    }

    function getActionItems() {
        if (model === 'movies') {
            return moviesItems
        } else if (model === 'artists') {
            return artistsItems
        } else if (model === 'series') {
            return []
        } else if (model === 'articles') {
            return articlesItems
        } else {
            return []
        }
    }

    function getBody() {
        if (model === 'movies') {
            if (action === 'create') {
                return <MovieCreate token={token} />
            } else if (action === 'update') {
                return <MovieUpdate token={token} />
            } else if (action === 'cast') {
                return <MovieCastEdit token={token} />
            } else if (action === 'crew') {
                return <MovieCrewEdit token={token} />
            } else if (action === 'platform') {
                return <MoviePlatformEdit token={token} />
            }
        } else if (model === 'artists') {
            if (action === 'create') {
                return <ArtistCreate token={token} />
            } else if (action === 'update') {
                return <ArtistUpdate token={token} />
            } else if (action === 'cast') {
                return <ArtistCastEdit token={token} />
            } else if (action === 'crew') {
                return <ArtistCrewEdit token={token} />
            }
        } else if (model === 'articles') {
            if (action === 'create') {
                return <ArticleCreate token={token} />
            }
        }
        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Menu 
                    mode='inline'
                    theme='light'
                    inlineCollapsed={true}
                    items={modelItems}
                    defaultSelectedKeys={model}
                    onClick={onSelectModel}
                />
            </div>
            <div className={styles.right}>
                <div className={styles.models}>
                    <Menu 
                        mode='horizontal'
                        theme='light'                        
                        items={getActionItems()}
                        defaultSelectedKeys={action}
                        onClick={onSelectAction}
                        style={{ width: '100%' }}
                    />        
                </div>
                <div className={styles.actions}>
                    {getBody()}  
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard