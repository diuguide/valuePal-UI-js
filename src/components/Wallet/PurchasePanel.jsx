import { Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { purchaseOrder } from "../../utilities/wallet";
import { useDispatch } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import {
  retrieveWal,
  updateHoldingsTableFunc,
} from "../../slice/wallet/walletSlice";

const PurchasePanel = () => {
  const tickerData = useSelector(tickerDataState);
  const auth = useSelector(authState);
  const dispatch = useDispatch();

  

  const [order, setOrder] = useState({
    ticker: tickerData.ticker || "",
    quantity: 0,
    price: tickerData.data.quoteResponse.result[0].regularMarketPrice || 0,
  });

  let cost = order.quantity * order.price || null;

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

  const styling = {
    container: {
      borderRadius: "10px",
      padding: "10px",
    },
    button: {
      marginRight: "5px",
      backgroundColor: "red",
      border: "none"
    },
    form: {},
    cost: {

    }
  };

  return (
    <Row style={styling.container} className="bg-secondary mt-2">
      <Col className="d-flex">
        <Button style={styling.button} onClick={handleSubmit}>Buy</Button>
        <Form className="d-flex">
          <Form.Group>
            <Form.Control
              style={styling.form}
              name="quantity"
              type="text"
              value={order.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              style={styling.cost}
              value={order.quantity == 0 ? 0 : "$" + cost.toFixed(2)}
              placeholder="Cost"
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default PurchasePanel;
