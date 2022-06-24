import CustomLayout from '../components/Layout/CustomLayout'
import { SessionProvider } from "next-auth/react"
import 'antd/dist/antd.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
    return (
        <SessionProvider session={session}>
            <CustomLayout>
                <Component {...pageProps} />
            </CustomLayout>
        </SessionProvider>
    )
}

export default MyApp
