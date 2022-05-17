import Menu from "./Menu"
import { Divider, Typography, Button, Space } from "antd"
import { FacebookFilled, InstagramFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";

import styles from '../../styles/Sider.module.css'

const Sider = () => {
    return (
        <div className={styles.sider}>
            <Menu />
            <Divider style={{ margin: '16px 0' }} />
            <div className={styles.container}>
                <Typography.Title level={5}>MOVIE+ веб сайт:</Typography.Title>
                Donec finibus ac nisi in volutpat. Donec nibh neque, mattis in fermentum et, facilisis et magna. Aenean auctor nisl eget ipsum mattis lobortis.
            </div>
            <Divider style={{ margin: '16px 0' }} />
            <div className={styles.container}>
                <Typography.Title level={5}>Бидэнтэй холбогдох:</Typography.Title>
                ajdk jakdjkasjkd
            </div>
            <Divider style={{ margin: '16px 0' }} />
            <div className={styles.container}>
                <Typography.Title level={5}>Сошиал сувгууд:</Typography.Title>
                <div className={styles.socialmedia}>
                    <Button className={styles.facebook} type="text" shape="circle" size="large" icon={<FacebookFilled />} />
                    <Button className={styles.instagram} type="text" shape="circle" size="large" icon={<InstagramFilled />} />
                    <Button className={styles.youtube} type="text" shape="circle" size="large" icon={<YoutubeFilled />} />
                    <Button className={styles.twitter} type="text" shape="circle" size="large" icon={<TwitterOutlined />} />
                </div>
            </div>  
            <Divider style={{ margin: '16px 0' }} />
            <div className={styles.container}>
                <Typography.Title level={5}>Зар сурталчилгаа</Typography.Title>          
                <span>бла бла бла</span>           
            </div>
        </div>
    )
}

export default Sider