import { Divider, List, Typography } from 'antd'
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import MovieCard from '../../components/Movie/MovieCard';
import MovieFilter from '../../components/Movie/MovieFilter';
import Loading from '../../components/Loading'
import api from '../../api'
import { useSession } from 'next-auth/react'

const fetcher = url => axios.get(url).then(res => res.data)

const MovieList = () => {
    const [user, setUser] = useState()
    const [pageIndex, setPageIndex] = useState(1)
    const [search, setSearch] = useState()
    const [genre, setGenre] = useState(0)
    const [decade, setDecade] = useState(0)
    const [year, setYear] = useState(0)
    const [scoreTo, setScoreTo] = useState(0)    
    const [order, setOrder] = useState()   

    function onPageChange (pageNum) {
        setPageIndex(pageNum)
    }

    function onSearch (val) {
        setSearch(val)
    }

    function onGenreSelect (id) {
        setGenre(id)
    }

    function onDecadeSelect (decade) {
        setYear(0)
        setDecade(decade)
    }    

    function onYearSelect (year) {
        setYear(year)
    }    

    function onScoreToSelect (scoreTo) {
        setScoreTo(scoreTo)
    }

    function onOrderSelect (order) {
        setOrder(order)
    }

    function getURL () {
        // let url = 'https://movieplusback.herokuapp.com/api/movies/movielist/?'
        let url = `${api.movielist}/?`
        if (search && search !== '') {
            url += `search=${search}&`
        }
        if (genre && genre !== 0) {
            url += `genre=${genre}&`
        }
        if (decade && decade !== 0) {
            url += `decade=${decade}&`
        }  
        if (year && year !== 0) {
            url += `year=${year}&`
        }        
        if (scoreTo && scoreTo !== 0) {
            url += `scoreto=${scoreTo * 20}&`
        }
        if (order && order !== '') {
            url += `order=${order}&`
        }
        url += `page=${pageIndex}`
        return url
    }

    const { data: movies } = useSWR(getURL, fetcher);

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
        <div>                        
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Кино {movies ? `(${movies.count})` : ''}</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <MovieFilter onSearch={onSearch} onGenreSelect={onGenreSelect} onDecadeSelect={onDecadeSelect} onYearSelect={onYearSelect} onScoreToSelect={onScoreToSelect} onOrderSelect={onOrderSelect} />
            { movies ? (
                <List 
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 4,
                        md: 5,
                        lg: 5,
                        xl: 5,
                        xxl: 6,
                    }}
                    pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,                   
                        current: pageIndex,                    
                        pageSize: 20,                    
                        total: movies.count,
                        size: 'small',
                        onChange: onPageChange
                    }}
                    dataSource={movies.results}                
                    renderItem={movie => (
                        <List.Item key={movie.id}>
                            <MovieCard movie={movie} user={user} token={session ? session.token : undefined} />
                        </List.Item>
                    )}
                />
            ) : (                
                <Loading />
            )}            
        </div>
    )
}

export default MovieList