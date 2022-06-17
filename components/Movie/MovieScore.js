import { Progress } from 'antd'
import styles from '../../styles/Movie.module.css'

const MovieScore = ({ score, size }) => {

    function getPercent(percent) {
        if (percent === 0 ) {
            return '?'
        } else {
            return (percent / 20).toFixed(1)
        }
    }

    return (
        <div className={`moviescore ${size}`}>
            <Progress                
                type="circle"
                width={size === 'small' ? 40 : size === 'default' ? 60 : 80}
                strokeColor={
                    score < 25 ? '#eb2f06' :
                    score < 50 ? '#e67e22' :
                    score < 75 ? '#fff200' :
                    '#4CD137'
                }
                trailColor="#3c3c3c"
                strokeWidth={6}
                percent={score}
                format={percent => getPercent(percent)}                                
            />
        </div>
    )
}

export default MovieScore