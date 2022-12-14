import SideMenu from "./SideMenu"
import { Divider, Typography, Button, Space, Descriptions } from "antd"
import { FacebookFilled, InstagramFilled, TwitterOutlined, YoutubeFilled } from "@ant-design/icons";

import styles from '../../styles/Sider.module.css'
import Link from "next/link";

const Sider = () => {

    function onHide() {}

    return (
        <div className={styles.sider}>
            <SideMenu onHide={onHide} />
            <Divider style={{ margin: '16px 0' }} />
            <div className={styles.container}>
                <Typography.Title level={5}>MOVIE+ веб сайт:</Typography.Title>
                Веб сайтыг ашиглан Монгол кино болоод уран бүтээлчдийн мэдээллийг авах, сэтгэгдлээ хуваалцах, үнэлгээ өгөх зэрэг үйлдлүүдийг хийх боломжтой. Дэлгэрэнгүй мэдээллийг:
                <Link href={`/about`}> Бидний тухай</Link>
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
                <Typography.Title level={5}>Бидэнтэй холбогдох:</Typography.Title>
                <Descriptions column={1} size="small">
                    <Descriptions.Item label="E-mail">movieplus@gmail.com</Descriptions.Item>
                    <Descriptions.Item label="Утас">+976 9876-5432</Descriptions.Item>
                </Descriptions>
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