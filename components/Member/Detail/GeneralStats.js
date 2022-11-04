import { CheckOutlined, ClockCircleOutlined, EyeOutlined, HeartOutlined, StarOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons'
import { Row, Col, Typography } from 'antd'
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
            <Typography.Title level={5}>Статистик</Typography.Title>
            <Row gutter={[24, 4]}>
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<CheckOutlined />} label="Үзсэн" value={member.movies_watched.length} />
                </Col>            
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<HeartOutlined />} label="Таалагдсан" value={member.movies_like.length} />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<ClockCircleOutlined />} label="Дараа үзэх" value={member.movies_watchlist.length} />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<StarOutlined />} label="Үнэлгээ өгсөн" value={member.movies_rated.length} />
                </Col>            
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<TeamOutlined />} label="Дагагчид" value={member.followers.length} />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <StatRow icon={<UserAddOutlined />} label="Дагаж буй" value={member.following.length} />
                </Col>                                                                            
            </Row>
        </div>
    )
}

export default GeneralStats