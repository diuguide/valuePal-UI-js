import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { sellStockOrder, getUserData } from "../../slice/wallet/walletSlice";

const SellPanel = () => {
  const tickerData = useSelector(tickerDataState);
  const dispatch = useDispatch();
  const [sellOrder, setSellOrder] = useState({
    ticker: tickerData.ticker || "",
    quantity: 0,
    price: 0,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellOrder({ ...sellOrder, [name]: value });
  };

  const handleClick = () => {
    dispatch(
      sellStockOrder({
        token: localStorage.getItem("authorization"),
        sellOrder: sellOrder,
      })
    );
    setSellOrder({
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
        <Form>
          <Form.Group>
            <Form.Control
              style={styling.form}
              name="quantity"
              type="text"
              value={sellOrder.quantity}
              onChange={handleChange}
              placeholder="Quantity"
            ></Form.Control>
          </Form.Group>
        </Form>
      </Col>
      <Col>
        <Button onClick={handleClick}>Sell</Button>
      </Col>
    </Row>
  );
};

export default SellPanel;
