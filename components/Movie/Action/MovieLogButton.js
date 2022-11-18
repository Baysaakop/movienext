import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useState } from "react"
import MovieLogModal from "./MovieLogModal"

const MovieLogButton = (props) => {          

    const [visible, setVisible] = useState(false)

    function updateLog (data) {
        props.updateLog(data)
    }

    return (
        <div>
            <Button 
                block={props.block}
                size={props.size}
                shape={props.shape}
                type="dashed" 
                icon={<PlusOutlined />}             
                onClick={() => setVisible(true)}      
            >
                {props.text}
            </Button>        
            { visible ? 
                <MovieLogModal 
                    movie={props.movie} 
                    session={props.session} 
                    log={props.log} 
                    onHide={() => setVisible(false)} 
                    updateLog={(data) => updateLog(data)}
                /> : <></>
            }
        </div>
    )        
}

export default MovieLogButton