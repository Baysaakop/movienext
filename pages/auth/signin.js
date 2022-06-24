import { getProviders, signIn } from "next-auth/react"
import { Typography, Button, Divider } from "antd"
import { FacebookFilled, GoogleOutlined, TwitterOutlined } from '@ant-design/icons'

export default function SignIn({ providers }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '4px' }}>
            <div style={{ textAlign: 'center', padding: '24px' }}>
                <Typography.Title level={2} style={{ margin: 0 }}>Welcome to MOVIE+</Typography.Title>
                <p style={{ fontSize: '16px' }}>Монгол киноны бүртгэл, мэдээлэл болон үнэлгээний нэгдсэн сан</p>
                {Object.values(providers).map((provider) => (
                    <div key={provider.name} style={{ margin: 'auto', width: '100%' }}>
                        <Button 
                            block
                            type="primary"
                            size="large"                          
                            icon={
                                provider.name === "Google" ? 
                                    <GoogleOutlined />
                                : provider.name === "Facebook" ? 
                                    <FacebookFilled />
                                : provider.name === "Twitter" ?
                                    <TwitterOutlined />
                                :
                                    <></>
                            }
                            style={
                                provider.name === "Google" ? 
                                    { background: '#dd4b39', border: '0', borderRadius: '4px', marginBottom: '8px' } 
                                : provider.name === "Facebook" ? 
                                    { background: '#3B5998', border: '0', borderRadius: '4px', marginBottom: '8px' } 
                                : provider.name === "Twitter" ?
                                    { background: '#55ACEE', border: '0', borderRadius: '4px', marginBottom: '8px' }
                                :
                                    { background: '#f1f1f1', border: '0', borderRadius: '4px', marginBottom: '8px' }
                            }  
                            onClick={() => signIn(provider.id)}
                        >
                            {provider.name} ашиглан нэвтрэх
                        </Button>                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}