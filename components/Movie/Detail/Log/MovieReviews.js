import { List, Typography } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react';
import api from '../../../../api';
import styles from '../../../../styles/Movie/Detail/MovieCastCrew.module.css'
import MovieReview from './MovieReview';

const MovieReviews = (props) => {    
    const [data, setData] = useState([])

    useEffect(() => {
        if (props.id) {
            axios({
                method: 'GET',
                url: `${api.movielogs}?movie=${props.id}&comment=True`
            })
            .then(res => {                                     
                setData(res.data.results)            
            })
            .catch(err => {            
                console.log(err)
            })
        }        
    }, [props.id])       

    if (data.length > 0) {
        return (            
            <div className={styles.container}>
                <div className={styles.header}>
                    <Typography.Title level={5}>Сэтгэгдэл</Typography.Title>                                
                </div>
                <List                            
                    className={styles.reviews}                         
                    itemLayout="vertical"                                    
                    dataSource={data}                             
                    pagination={{ pageSize: 10, size: 'small', hideOnSinglePage: true }}
                    renderItem={item => (
                        <List.Item key={item.id}>         
                            <MovieReview item={item} />                  
                        </List.Item>
                    )}
                />        
            </div>            
        )
    } else {
        return (
            <></>
        )
    }
}

export default MovieReviews