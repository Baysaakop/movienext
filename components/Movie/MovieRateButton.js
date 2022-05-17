import { StarOutlined } from "@ant-design/icons"
import { Button, Popover, Rate, notification } from "antd"
import { useState } from "react"


const MovieRateButton = (props) => {

    function onChange (val) {
        notification['success']({
            message: 'Үнэлгээ өгсөн',
            description: `"${props.movie.title}" кинонд өгсөн таны үнэлгээг хүлээж авлаа.`
        })
    }

    return (
        <Popover                                
            placement="right"
            title={<strong>Таны үнэлгээ: </strong>}
            trigger="click"
            content={
                <div onMouseDown={() => props.onMouseDown()}>
                    <Rate allowHalf count={5} onChange={onChange} />
                </div>
            }
        >
            <Button 
                className="like" 
                size="large" 
                shape="circle" 
                type="text" 
                icon={<StarOutlined />}         
            />
        </Popover>
    )
}

export default MovieRateButton