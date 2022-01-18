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
    price: tickerData.data.price || 0,
  });

  let cost = order.quantity * order.price || null;

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
      price: tickerData.data.price || 0,
    });
    setTimeout(() => {
      dispatch(getUserData(localStorage.getItem("authorization")));
    }, 500);
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
      width: "100px",
    },
    cost: {
      height: "25px",
      width: "100px",
      backgroundColor: "white",
      border: "1px grooved #ced4da",
      borderRadius: "3px",
      padding: ".065rem .75rem",
    },
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
        <div style={styling.cost}>
          {order.quantity == 0 ? 0 : "$" + cost.toFixed(2)}
        </div>
      </Col>
    </Row>
  );
};

export default BuyPanel;
