import { Col, Divider, List, Row, Typography } from "antd"
import ArticleFilter from "../../components/Article/ArticleFilter"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import api from '../../api'
import useSWR from 'swr';
import Loading from '../../components/Loading'
import styles from '../../styles/Article.module.css'
import ArticleCard from "../../components/Article/ArticleCard"


const fetcher = url => axios.get(url).then(res => res.data)

const ArticleList = () => {    

    const [user, setUser] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [search, setSearch] = useState()
    const [category, setCategory] = useState(0)    
    const [order, setOrder] = useState()   

    function onPageChange (pageNum) {
        setPageIndex(pageNum)
    }

    function onSearch (val) {
        setSearch(val)
    }

    function onCategorySelect (id) {
        setCategory(id)
    }    

    function onOrderSelect (order) {
        setOrder(order)
    }

    function getURL () {        
        let url = `${api.articles}/?`
        if (search && search !== '') {
            url += `search=${search}&`
        }
        if (category && category !== 0) {
            url += `category=${category}&`
        }       
        if (order && order !== '') {
            url += `order=${order}&`
        }
        url += `page=${pageIndex}`
        return url
    }

    const { data: articles } = useSWR(getURL, fetcher);

    const { data: session, status } = useSession()

    if (status === "authenticated" && user === undefined) {        
        axios({
            method: 'GET',
            url: `${api.userdetail}/${session.id}/`
        })
        .then(res => {                       
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }   

    return (
        <div className={styles.articleList}>
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Нийтлэл</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>            
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={16}>                
                    {articles ? (
                        <List                
                            grid={{
                                gutter: 16,
                                column: 1            
                            }}             
                            pagination={{
                                pageSize: 10,
                                size: 'small'
                            }}
                            dataSource={articles.results}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <ArticleCard article={item} />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Loading />
                    )}                        
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <div className={styles.container}>
                        <ArticleFilter onSearch={onSearch} onCategorySelect={onCategorySelect} onOrderSelect={onOrderSelect} />
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Онцлох нийтлэл</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Топ нийтлэгчид</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Шинэ кинонууд</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                    <div className={styles.container}>
                        <Typography.Title level={5}>Зар сурталчилгаа</Typography.Title>
                        <span>Бла бла бла</span>
                    </div>
                </Col>                
            </Row>
        </div>
    )
}

export default ArticleList