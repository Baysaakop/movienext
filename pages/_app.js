import CustomLayout from '../components/Layout/CustomLayout'
import 'antd/dist/antd.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <CustomLayout>
            <Component {...pageProps} />
        </CustomLayout>
    )
}

export default MyApp
