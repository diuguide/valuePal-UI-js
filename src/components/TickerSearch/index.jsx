import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  tickerDataState,
  yahooTickerSearch,
} from "../../slice/data/tickerSearchSlice";
import { yahooTickerHistory } from "../../slice/data/tickerHistorySlice";

const TickerSearch = () => {
  const dispatch = useDispatch();
  const tickerState = useSelector(tickerDataState);

  const [ticker, setTicker] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setTicker(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(yahooTickerSearch(ticker));
    dispatch(
      yahooTickerHistory({ api: 1, interval: "1m", range: "1d", ticker })
    );
    setTicker("");
  };
  return (
    <Row>
      <Col>
        <Form className="d-flex">
          <Form.Control
            type="text"
            name="ticker"
            value={ticker}
            onChange={handleChange}
            placeholder="Search for stock"
          />
          <Button onClick={handleClick}>Search</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default TickerSearch;
