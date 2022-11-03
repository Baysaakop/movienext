import { CheckOutlined, ClockCircleOutlined, EyeOutlined, HeartOutlined, StarOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import styles from '../../../styles/Member/MemberDetail.module.css'

const StatRow = ({icon, label, value}) => {
    return (
        <div className={styles.row}>
            <div>
                {icon} <strong>{label}</strong>
            </div>
            <div>{value}</div>
        </div>
    )
}

const GeneralStats = ({ member }) => {
    return (
        <div>
            <StatRow icon={<CheckOutlined />} label="Үзсэн" value={member.movies_watched.length} />
            <StatRow icon={<HeartOutlined />} label="Таалагдсан" value={member.movies_like.length} />
            <StatRow icon={<ClockCircleOutlined />} label="Дараа үзэх" value={member.movies_watchlist.length} />
            <StatRow icon={<StarOutlined />} label="Үнэлгээ өгсөн" value={member.movies_rated.length} />
            <StatRow icon={<TeamOutlined />} label="Дагагчид" value={member.followers.length} />
            <StatRow icon={<UserAddOutlined />} label="Дагаж буй" value={member.following.length} />
        </div>
    )
}

export default GeneralStats