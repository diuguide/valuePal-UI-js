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

  const procTimeStamp = (timestamp) => {
    if (timestamp != null) {
      let temp = timestamp.split("T");

      let temp2 = temp[1].split(".");
      return temp[0] + " " + temp2[0] + " EST";
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const rowStyle = {
    ticker: {},
    quantity: {},
    price: {},
    table: {
      maxHeight: "300px",
      overflow: "auto",
    },
  };

  return (
    <>
      {order.order.isLoaded ? (
        <Row>
          <Col style={rowStyle.table}>
            <Table style={rowStyle.table} hover>
              <thead
                style={{
                  position: "sticky",
                  top: "0",
                  zIndex: "1",
                  backgroundColor: "white",
                }}
              >
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
                {order.order.orders.length > 0 ? (
                  order.order.orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>{procTimeStamp(order.timestamp)}</td>
                        <td>{order.orderType == "B" ? "Buy" : "Sell"}</td>
                        <td style={rowStyle.ticker}>{order.ticker}</td>
                        <td>{order.price.toFixed(2)}</td>
                        <td>{order.quantity}</td>
                        <td>${order.totalValue.toFixed(2)}</td>
                        <td>{order.status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="empty-msg">
                    There doesn't seem to be anything here...
                  </div>
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
