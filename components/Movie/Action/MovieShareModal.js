import { CopyOutlined } from '@ant-design/icons'
import { Button, message, Modal, Space, Tooltip } from 'antd'
import { FacebookShareButton, FacebookIcon, FacebookMessengerShareButton, FacebookMessengerIcon, TwitterShareButton, TwitterIcon } from 'next-share'

const MovieShareModal = (props) => {

    function onCopy () {
        const el = document.createElement("input")
        el.value = window.location.href
        document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
        message.info("Copied")
    }

    return (
        <div>
            <Modal                
                className="share"
                centered
                visible={true}
                footer={null}
                onCancel={() => props.hide()}                                
                style={{ padding: 0 }}
                title="Хуваалцах"
                width={300}
            >
                <div>
                    <Space size={16} wrap>
                        <div>
                            <FacebookMessengerShareButton
                                url={window.location.origin + props.url}                       
                            >
                                <FacebookMessengerIcon size={48} round />                                        
                            </FacebookMessengerShareButton>
                        </div>
                        <div>
                            <FacebookShareButton
                                url={window.location.origin + props.url}                       
                            >
                                <FacebookIcon size={48} round />                                
                            </FacebookShareButton>
                        </div>
                        <div>
                            <TwitterShareButton
                                url={window.location.origin + props.url}                       
                            >
                                <TwitterIcon size={48} round />                                
                            </TwitterShareButton>
                        </div>
                        <Tooltip title="Copy URL">
                            <Button 
                                shape='circle' 
                                type='primary' 
                                size="large" 
                                icon={<CopyOutlined />} 
                                style={{ background: '#2c3e50', border: 0, width: '48px', height: '48px', marginBottom: '8px' }} 
                                onClick={onCopy}
                            />
                        </Tooltip>
                    </Space>                    
                </div>
            </Modal>
        </div>
    )
}

export default MovieShareModal