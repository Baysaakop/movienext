import { CheckSquareOutlined } from "@ant-design/icons"
import { Button, notification } from "antd"


const MovieWatchedButton = (props) => {

    function onClick() {
        notification['success']({
            message: 'Үзсэн',
            description: `"${props.movie.title}" таны үзсэн киноны жагсаалтад нэмэгдлээ.`
        })
        props.onBlur()
    }
    
    return (
        <Button 
            className="like" 
            size="large" 
            shape="circle" 
            type="text" 
            icon={<CheckSquareOutlined />}   
            onClick={onClick}      
        />
    )
}

export default MovieWatchedButton