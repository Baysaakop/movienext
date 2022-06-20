import { Divider, List, Typography } from 'antd'
import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import MovieCard from '../../components/Movie/MovieCard';
import MovieFilter from '../../components/Movie/MovieFilter';
import Loading from '../../components/Loading'

const fetcher = url => axios.get(url).then(res => res.data)

const MovieList = () => {

    const [pageIndex, setPageIndex] = useState(1)
    const [genre, setGenre] = useState(0)
    const [decade, setDecade] = useState(0)
    const [year, setYear] = useState(0)
    const [scoreTo, setScoreTo] = useState(0)    
    const [order, setOrder] = useState()   

    function onPageChange (pageNum) {
        setPageIndex(pageNum)
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
        let url = 'https://movieplusback.herokuapp.com/api/movies/movielist/?'
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

    const { data } = useSWR(getURL, fetcher);

    return (
        <div>                        
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Кино {data ? `(${data.count})` : ''}</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <MovieFilter onGenreSelect={onGenreSelect} onDecadeSelect={onDecadeSelect} onYearSelect={onYearSelect} onScoreToSelect={onScoreToSelect} onOrderSelect={onOrderSelect} />
            { data ? (
                <List 
                    grid={{
                        gutter: 16,
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 4,
                        xl: 5,
                        xxl: 5,
                    }}
                    pagination={{
                        hideOnSinglePage: true,
                        showSizeChanger: false,                   
                        current: pageIndex,                    
                        pageSize: 24,                    
                        total: data.count,
                        size: 'small',
                        onChange: onPageChange
                    }}
                    dataSource={data.results}                
                    renderItem={movie => (
                        <List.Item key={movie.id}>
                            <MovieCard movie={movie} />
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