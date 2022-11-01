import { Grid, Button, Divider, List, message, Result, Typography } from 'antd'
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import MovieCard from '../../components/Movie/MovieCard';
import MovieFilter from '../../components/Movie/MovieFilter';
import Loading from '../../components/Loading'
import api from '../../api'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import styles from '../../styles/Movie/MovieList.module.css'

const { useBreakpoint} = Grid
const fetcher = url => axios.get(url).then(res => res.data)

const MovieList = () => {
    const screens = useBreakpoint()
    const router = useRouter()    
    const {search, genre, decade, year, scoreTo, order, page} = router.query

    const { data: movies, error } = useSWR(router.isReady ? getURL : null, fetcher);

    const [user, setUser] = useState()

    function onPageChange (pageNum) {        
        router.push({
            pathname: '/movies',
            query: { ...router.query, page: pageNum }
        })
    }

    function onSearch (val) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, search: val, page: 1 }
        })
    }

    function onGenreSelect (id) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, genre: id, page: 1 }
        })
    }

    function onDecadeSelect (decade) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, decade: decade, year: 0, page: 1 }
        })
    }    

    function onYearSelect (year) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, year: year, page: 1 }
        })
    }    

    function onScoreToSelect (scoreTo) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, scoreTo: scoreTo, page: 1 }
        })
    }

    function onOrderSelect (order) {
        router.push({
            pathname: '/movies',
            query: { ...router.query, order: order, page: 1 }
        })
    }

    function getURL () {                
        let url = `${api.movielist}/?`
        if (search && search !== '') {
            url += `search=${search}&`
        }
        if (genre) {
            if (!isNaN(parseInt(genre)) && genre !== '0') {
                url += `genre=${genre}&`                
            }
        }
        if (decade) {
            if (!isNaN(parseInt(decade)) && decade !== '0') {
                url += `decade=${decade}&`                
            }
        }
        if (year) {
            if (!isNaN(parseInt(year)) && year !== '0') {
                url += `year=${year}&`                
            }
        }    
        if (scoreTo) {
            if (!isNaN(parseInt(scoreTo)) && scoreTo !== '0') {
                url += `scoreto=${scoreTo * 20}&`                
            }
        }
        if (order && order !== '') {
            url += `order=${order}&`
        }
        if (page) {
            if (isNaN(parseInt(page))) {
                message.error("URL алдаатай байна. Шалгаад дахин оролдоно уу.")
            } else {
                url += `page=${page}`
            }
        }
        return url
    }

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
        <div className={styles.movieList}>                        
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Кино {movies ? `(${movies.count})` : ''}</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>                      
            { error ? (
                <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px' }}>
                    <Result
                        status="404"
                        title="Хуудас олдсонгүй."
                        subTitle="Хайлтын утганд таарах хуудас олдсонгүй. Та доорх товчийг дарж уг хуудсыг дахин ачааллана уу."
                        extra={<Button type='primary' href='/movies'>Refresh</Button>}
                    />
                </div>
            ) : (
                movies ? (
                    <div>                    
                        <MovieFilter 
                            search={search ? search : ''}
                            genre={(genre && !isNaN(parseInt(genre.toString()) && genre.toString() !== '0') ? parseInt(genre.toString()) : 0)}
                            decade={(decade && !isNaN(parseInt(decade.toString()) && decade.toString() !== '0') ? parseInt(decade.toString()) : 0)}
                            year={(year && !isNaN(parseInt(year.toString()) && year.toString() !== '0') ? parseInt(year.toString()) : 0)}    
                            scoreTo={(scoreTo && !isNaN(parseInt(scoreTo.toString()) && scoreTo.toString() !== '0') ? parseInt(scoreTo.toString()) : 0)}
                            order={(order && order !== '') ? order : '-view_count'} 
                            onSearch={onSearch} 
                            onGenreSelect={onGenreSelect} 
                            onDecadeSelect={onDecadeSelect} 
                            onYearSelect={onYearSelect} 
                            onScoreToSelect={onScoreToSelect} 
                            onOrderSelect={onOrderSelect} 
                        />  
                        <List 
                            grid={{
                                gutter: 8,
                                xs: 3,
                                sm: 3,
                                md: 5,
                                lg: 5,
                                xl: 5,
                                xxl: 6,
                            }}
                            pagination={{
                                hideOnSinglePage: true,
                                showSizeChanger: false,                   
                                current: page ? parseInt(page) : 1,
                                pageSize: 30,                    
                                total: movies.count,
                                size: 'small',
                                onChange: onPageChange
                            }}
                            dataSource={movies.results}                
                            renderItem={movie => (
                                <List.Item key={movie.id}>
                                    <MovieCard 
                                        movie={movie} 
                                        user={user} 
                                        token={session ? session.token : undefined}                                         
                                    />
                                </List.Item>
                            )}
                        />  
                    </div>
                ) : (                
                    <Loading />
                )
            )}          
        </div>
    )
}

export default MovieList