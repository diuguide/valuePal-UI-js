import { Row, Col, Table } from "react-bootstrap";
import { useEffect} from "react";

const OrdersTable = () => {
    return(
        <>
        <Row>
            <Col>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Ticker</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                
            </Table>
            </Col>
        </Row>
        </>
    )
}

export default OrdersTable;