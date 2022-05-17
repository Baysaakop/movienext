import { Divider, List, Typography } from 'antd'
import { useState } from 'react';
import MovieCard from '../../components/Movie/MovieCard';
import MovieFilter from '../../components/Movie/MovieFilter';

const MovieList = ({ movies, total }) => {

    const [page, setPage] = useState(1)

    function onPageChange (pageNum) {
        setPage(pageNum)
    }

    return (
        <div>                        
            <div style={{ padding: '8px 0' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>Кино: {total}</Typography.Title>            
                <Divider style={{ margin: '8px 0' }} />
            </div>
            <MovieFilter />
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
                    current: page,                    
                    pageSize: 24,                    
                    total: total,
                    size: 'small',
                    onChange: onPageChange
                }}
                dataSource={movies}                
                renderItem={movie => (
                    <List.Item key={movie.id}>
                        <MovieCard movie={movie} />                        
                    </List.Item>
                )}
            />
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(`https://movieplusback.herokuapp.com/api/movies/films/`);
    const data = await res.json();

    return {
        props: { movies: data.results, total: data.count }
    }
}

export default MovieList