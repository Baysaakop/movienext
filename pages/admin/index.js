import React from 'react'
import { useSession, signIn } from 'next-auth/react'
import Loading from '../../components/Loading'
import { Button, Result } from 'antd'
import AdminDashboard from '../../components/Admin/AdminDashboard'

const Admin = () => {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <Loading />
        )
    } else if (status === "authenticated") {
        if (session.role === 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                    <Result
                        status="403"
                        title="Хуудас үзэх боломжгүй."
                        subTitle="Зөвхөн админ эрхтэй хэрэглэгч үзэх боломжтой."                        
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <AdminDashboard token={session.token} />
                </div>
            )
        }
    } else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
                <Result
                    status="403"
                    title="Хуудас үзэх боломжгүй."
                    subTitle="Энэ хуудсыг үзэхийн тулд эхлээд нэвтрэх шаардлагатай."
                    extra={<Button type="primary" onClick={() => signIn()}>Нэвтрэх</Button>}
                />
            </div>
        )
    }
}

export default Admin