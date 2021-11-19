import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";

const SellPanel = () => {
  const tickerData = useSelector(tickerDataState);
  const [sellOrder, setSellOrder] = useState({
    ticker: tickerData.ticker || "",
    quantity: 0,
    price: tickerData.data.quoteResponse.result[0].regularMarketPrice || 0,
  });

  let total = sellOrder.quantity * sellOrder.price || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSellOrder({ ...sellOrder, [name]: value });
  };

  const handleClick = () => {
    console.log("Sell Order: ", sellOrder);
    setSellOrder({
      ticker: tickerData.ticker || "",
      quantity: 0,
      price: tickerData.data.quoteResponse.result[0].regularMarketPrice || 0,
    });
  };

  const styling = {
    container: {
      borderRadius: "10px",
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
        <div style={styling.cost}>
          {order.quantity == 0 ? 0 : "$" + cost.toFixed(2)}
        </div>
      </Col>
      <Col>
        <Button onClick={handleClick}>Sell</Button>
      </Col>
    </Row>
  );
};

export default SellPanel;
