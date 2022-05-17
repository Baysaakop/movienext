import Meta from "./Meta"
import Header from "./Header";
import Footer from "./Footer";
import { Row, Col } from "antd";
import Sider from "./Sider";

const CustomLayout = ({ children }) => {

    return (
        <>
            <Meta />      
            <header>
                <Header />
            </header>
            <main>
                <Row gutter={24}>
                    <Col xs={0} sm={0} md={0} lg={5}>
                        <Sider />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={19}>
                        {children}
                    </Col>
                </Row>                                
            </main>                  
            <footer>
                <Footer /> 
            </footer>  
        </>
    )
}

export default CustomLayout