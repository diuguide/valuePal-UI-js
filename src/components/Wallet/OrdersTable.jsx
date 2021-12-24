import { Row, Col, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders, walletState } from "../../slice/wallet/walletSlice";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const order = useSelector(walletState);

  const getOrders = () => {
    dispatch(userOrders(localStorage.getItem("authorization")));
  };

  useEffect(() => {
    console.log("orders table render!");
    getOrders();
  }, []);
  

  return (
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
  );
};

export default OrdersTable;
