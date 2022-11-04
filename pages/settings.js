import { useSession, signIn } from 'next-auth/react'
import { Button, Result, Tabs } from 'antd';
import Loading from '../components/Loading'
import SettingsSocial from '../components/Member/SettingsSocial';
import styles from '../styles/Settings.module.css'
import SettingsInfo from '../components/Member/SettingsInfo';

const Settings = () => {        
    const { data: session, status } = useSession()    

    if (status === "loading") {
        return (
            <Loading />
        )        
    } else if (status === "authenticated" && session) {
        return (
            <div className={styles.settings}>
                <div className={styles.container}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Хэрэглэгчийн мэдээлэл" key="1">
                            <SettingsInfo session={session} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Сошиал медиа" key="2">
                            <SettingsSocial session={session} />
                        </Tabs.TabPane>
                    </Tabs>                
                </div>
            </div>
        )
    } else {        
        return (
            <div className={styles.settings}>
                <div className={styles.error403}>
                    <Result
                        status="403"
                        title="403"
                        subTitle="Энэ хуудсыг үзэхийн тулд эхлээд нэвтрэх шаардлагатай."
                        extra={<Button type="primary" onClick={() => signIn()}>Нэвтрэх</Button>}
                    />
                </div>
            </div>
        )
    }
}

export default Settings