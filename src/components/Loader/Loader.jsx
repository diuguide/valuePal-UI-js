import loader from "./loader.gif";
import { Row, Col } from "react-bootstrap";

const Loader = () => {
    return (
        <Row style={{ height: "100%"}} className="d-flex align-content-center">
            <Col className="d-flex justify-content-center">
            <img src={loader} alt="loading"></img>
            </Col>
        </Row>
    )
}

export default Loader;