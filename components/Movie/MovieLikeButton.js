import { HeartOutlined } from "@ant-design/icons"
import { Button, notification } from "antd"


const MovieLikeButton = (props) => {

    function onClick() {
        notification['success']({
            message: 'Таалагдсан',
            description: `"${props.movie.title}" таны таалагдсан киноны жагсаалтад нэмэгдлээ.`
        })
        props.onBlur()
    }

    return (
        <Button 
            className="like" 
            size="large" 
            shape="circle" 
            type="text"             
            icon={<HeartOutlined />}         
            onClick={onClick}
        />
    )
}

export default MovieLikeButton