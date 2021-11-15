import { Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { purchaseOrder } from "../../utilities/wallet";
import { useDispatch } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import { retrieveWal, updateHoldingsTableFunc } from "../../slice/wallet/walletSlice";

const PurchasePanel = () => {
  const tickerData = useSelector(tickerDataState);
  const auth = useSelector(authState);
  const dispatch = useDispatch();

  const [order, setOrder] = useState({
    ticker: tickerData.ticker || "",
    quantity: 0,
    price: tickerData.data.quoteResponse.result[0].regularMarketPrice || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    purchaseOrder(localStorage.getItem("authorization"), order);
    setOrder({
      ticker: tickerData.ticker || "",
      quantity: 0,
      price: tickerData.data.quoteResponse.result[0].regularMarketPrice || 0,
    });
    dispatch(updateHoldingsTableFunc());
    dispatch(retrieveWal(auth.token));
  };
  return (
    <Row>
      <Col>
        <Button onClick={handleSubmit}>Buy</Button>
      </Col>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control
              name="quantity"
              type="text"
              value={order.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default PurchasePanel;
