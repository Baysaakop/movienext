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
    const [score, setScore] = useState(0)

    const { data } = useSWR(getURL, fetcher);

    function getURL () {
        let url = 'https://movieplusback.herokuapp.com/api/movies/films?'
        if (genre && genre !== 0) {
            url += `genre=${genre}&`
        }
        if (year && year !== 0) {
            url += `yearfrom=${year}&yearto=${year}&`
        }
        else if (decade && decade !== 0) {
            url += `yearfrom=${decade}&yearto=${decade+10}&`
        }  
        if (score && score !== 0) {
            url += `scorefrom=${(score-1)*20}&scoreto=${score * 20}&`
        }
        url += `page=${pageIndex}`
        return url
    }

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

    function onScoreSelect (score) {
        setScore(score)
    }

    return (
        <div>                        
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Кино {data ? `(${data.count})` : ''}</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <MovieFilter onGenreSelect={onGenreSelect} onDecadeSelect={onDecadeSelect} onYearSelect={onYearSelect} onScoreSelect={onScoreSelect} />
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

// export const getStaticProps = async () => {
//     const res = await fetch(`https://movieplusback.herokuapp.com/api/movies/films/`);
//     const data = await res.json();

//     return {
//         props: { movies: data.results, total: data.count }
//     }
// }

export default MovieList