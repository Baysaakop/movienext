import CustomLayout from '../components/Layout/CustomLayout'
import '../styles/globals.css'
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
    return (
        <CustomLayout>
            <Component {...pageProps} />
        </CustomLayout>
    )
}

export default MyApp
