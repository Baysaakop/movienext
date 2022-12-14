import { Typography } from 'antd'
import React from 'react'
import MovieScore from '../../Movie/MovieScore'
import styles from '../../../styles/Member/MemberDetail.module.css'

const MemberAverageScore = ({ member }) => {        
    return (
        <div>
            <Typography.Title level={5}>Дундаж үнэлгээ</Typography.Title>
            <div className={styles.avgScore}>
                <MovieScore score={member.movies_average_score} size="large" />
            </div>
        </div>
    )
}

export default MemberAverageScore