import { HeartOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, message, notification, Tooltip } from "antd"
import axios from "axios"
import api from "../../../api"

const MovieLogButton = (props) => {          

    // if (props.log) {
    //     return (
    //         <Tooltip title="Таалагдсан" placement={props.placement}>
    //             <Button 
    //                 size={props.size}
    //                 shape="circle" 
    //                 type="primary" 
    //                 icon={<HeartOutlined />}   
    //                 onClick={onRemove}      
    //                 style={{ background: '#ff5252', border: 0 }}
    //             />
    //         </Tooltip>
    //     )            
    // }
    return (
        <Tooltip title="Тэмдэглэх" placement={props.placement}>
            <Button 
                block={props.block}
                size={props.size}
                shape={props.shape}
                type="dashed" 
                icon={<PlusOutlined />}                   
            >
                {props.text}
            </Button>        
        </Tooltip>
    )        
}

export default MovieLogButton