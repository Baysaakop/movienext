import Meta from "./Meta"
import HeaderDesktop from "./Header/HeaderDesktop"
import HeaderMobile from "./Header/HeaderMobile"
import Footer from "./Footer"
import Sider from "./Sider"
import { Grid, Row, Col, Skeleton } from "antd"
import styles from '../../styles/Layout/Layout.module.css'

const { useBreakpoint } = Grid

const CustomLayout = ({ children }) => {

    const screens = useBreakpoint()

    if (screens) {
        if (screens.lg) {
            return (
                <div>
                    <Meta />      
                    <header>
                        <HeaderDesktop />
                    </header>
                    <main>
                        <div className={styles.main}>
                            <div className={styles.left}>
                                <Sider />
                            </div>
                            <div className={styles.right}>
                                {children}
                            </div>
                        </div>                        
                    </main>                  
                    <footer>
                        <Footer /> 
                    </footer>
                </div>
            )
        } else {
            return (
                <div>
                    <Meta />      
                    <header>
                        <HeaderMobile />
                    </header>
                    <main>
                        {children}
                    </main>                  
                    <footer>
                        <Footer /> 
                    </footer>
                </div>
            )
        }
    } else {
        return (
            <Skeleton active />
        )
    }
}

export default CustomLayout