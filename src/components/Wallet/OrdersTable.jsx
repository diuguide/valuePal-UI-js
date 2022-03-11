import { Row, Col, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders, walletState } from "../../slice/wallet/walletSlice";
import Loader from "../Loader/Loader";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const order = useSelector(walletState);
  

  const getOrders = () => {
    dispatch(userOrders(localStorage.getItem("authorization")));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {order.order.isLoaded ? (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Ticker</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {order.order.orders.length > 0 ?
                  order.order.orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{order.timestamp}</td>
                        <td>{order.orderType}</td>
                        <td>{order.ticker}</td>
                        <td>{order.price.toFixed(2)}</td>
                        <td>{order.quantity}</td>
                        <td>{order.totalValue.toFixed(2)}</td>
                        <td>{order.status}</td>
                      </tr>
                    );
                  }) : (
                    <div className="empty-msg">There doesn't seem to be anything here...</div>
                  )}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default OrdersTable;
