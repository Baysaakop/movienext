import { Typography } from 'antd'
import React from 'react'
import MovieScore from '../../Movie/MovieScore'
import styles from '../../../styles/Member/MemberDetail.module.css'

const MemberAverageScore = ({ member }) => {    

    function getAvgScore(items) {
        if (items.length === 0) {
            return 0
        }
        var total = 0
        var avg = 0
        items.forEach(element => {
            total += element.score
        })
        total = total * 10
        avg = total / items.length
        return avg
    }

    return (
        <div>
            <Typography.Title level={5}>Дундаж үнэлгээ</Typography.Title>
            <div className={styles.avgScore}>
                <MovieScore score={getAvgScore(member.movies_rated)} size="large" />
            </div>
        </div>
    )
}

export default MemberAverageScore