import { ClockCircleOutlined } from "@ant-design/icons"
import { Button, notification } from "antd"


const MovieWatchlistButton = (props) => {

    function onClick() {
        notification['success']({
            message: 'Дараа үзэх',
            description: `"${props.movie.title}" таны дараа үзэх киноны жагсаалтад нэмэгдлээ.`
        })
        props.onBlur()
    }
    
    return (
        <Button 
            className="like" 
            size="large" 
            shape="circle" 
            type="text" 
            icon={<ClockCircleOutlined />}   
            onClick={onClick}      
        />
    )
}

export default MovieWatchlistButton