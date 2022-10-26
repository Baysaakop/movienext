import Meta from "./Meta"
import HeaderLG from "./Header/HeaderLG"
import HeaderXS from "./Header/HeaderXS"
import Footer from "./Footer"
import Sider from "./Sider"
import { Grid, Row, Col, Skeleton } from "antd";

const { useBreakpoint } = Grid

const CustomLayout = ({ children }) => {

    const screens = useBreakpoint()

    if (screens) {
        if (screens.lg) {
            return (
                <div>
                    <Meta />      
                    <header>
                        <HeaderLG />
                    </header>
                    <main>
                        <Row gutter={24} style={{ margin: 0 }}>
                            <Col span={5}>
                                <Sider />
                            </Col>
                            <Col span={19}>
                                {children}
                            </Col>
                        </Row>
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
                        <HeaderXS />
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