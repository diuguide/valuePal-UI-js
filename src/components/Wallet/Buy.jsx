import { Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { useDispatch } from "react-redux";
import { buyStockOrder, getUserData } from "../../slice/wallet/walletSlice";

const BuyPanel = () => {
  const tickerData = useSelector(tickerDataState);
  const dispatch = useDispatch();
  const [order, setOrder] = useState({
    ticker: tickerData.ticker || "",
    quantity: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      buyStockOrder({
        token: localStorage.getItem("authorization"),
        buyOrder: order,
      })
    );
    setOrder({
      ticker: tickerData.ticker || "",
      quantity: 0,
      price: 0,
    });
    setTimeout(() => {
      dispatch(getUserData(localStorage.getItem("authorization")));
    }, 2000);
  };

  const styling = {
    container: {
      padding: "10px",
    },
    button: {
      marginRight: "5px",
      backgroundColor: "red",
      border: "none",
    },
    form: {
      height: "25px",
      width: "75px",
    }
  };

  return (
    <Row style={styling.container} className="bg-secondary mt-2">
      <Col>
        <Button style={styling.button} onClick={handleSubmit}>
          Buy
        </Button>
      </Col>
      <Col>
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
        </Form>
      </Col>
    </Row>
  );
};

export default BuyPanel;
