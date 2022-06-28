import { Progress } from 'antd'

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
                    score < 20 ? '#c0392b' :
                    score < 40 ? '#d35400' :
                    score < 60 ? '#f1c40f' :
                    score < 80 ? '#2ed573' :
                    '#4cd137'
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