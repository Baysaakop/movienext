import { List, Segmented } from 'antd'
import React, { useState } from 'react'
import Loading from '../Loading'
import MovieCard from '../Movie/MovieCard'

const MemberMovie = (props) => {

    const [type, setType] = useState('Үзсэн')

    function onSegmentChange(val) {        
        setType(val)
    }

    function getMovies() {
        if (type === 'Үзсэн') {
            return props.member.movies_watched
        } else if (type === 'Таалагдсан') {
            return props.member.movies_like
        } else if (type === 'Дараа үзэх') {
            return props.member.movies_watchlist
        } else if (type === 'Үнэлгээ өгсөн') {
            return props.member.movies_rated
        } else {
            return []
        }
    }

    function onPageChange(pageNum) {
        console.log(pageNum)
    }

    return (
        <div>
            <Segmented 
                block
                defaultValue={type}
                options={['Үзсэн', 'Таалагдсан', 'Дараа үзэх', 'Үнэлгээ өгсөн']}
                onChange={onSegmentChange}
                style={{ marginBottom: '16px' }}
            />
            <List 
                grid={{
                    gutter: 16,
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 5,
                    xl: 5,
                    xxl: 6,
                }}
                // pagination={{
                //     hideOnSinglePage: true,
                //     showSizeChanger: false,                   
                //     current: 1,                    
                //     pageSize: 30,                    
                //     total: movies.count,
                //     size: 'small',
                //     onChange: onPageChange
                // }}
                dataSource={getMovies()}                
                renderItem={movie => (
                    <List.Item key={movie.id}>                            
                        { type === 'Үнэлгээ өгсөн' ? (
                            <MovieCard movie={movie.movie} score={movie.score} user={props.user} token={props.token} />
                        ) : (
                            <MovieCard movie={movie} user={props.user} token={props.token} />
                        )}                       
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MemberMovie