import { useState } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  tickerDataState,
  yahooTickerSearch,
} from "../../slice/data/tickerSearchSlice";
import { yahooTickerHistory } from "../../slice/data/tickerHistorySlice";
import {
  errorState,
  
} from "../../slice/error/errorSlice";


const TickerSearch = () => {
  const dispatch = useDispatch();
  const tickerState = useSelector(tickerDataState);
  const error = useSelector(errorState);
  const [ticker, setTicker] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setTicker(value.toUpperCase());
  };

  const handleClick = (e) => {
    e.preventDefault();

    // console.log(getAutoComplete(ticker));

    dispatch(yahooTickerSearch(ticker));
    setTimeout(() => {
      dispatch(
        yahooTickerHistory({ api: 2, interval: "1m", range: "1d", ticker })
      );
    }, 500);

    setTicker("");
  };
  return (
    <>
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
            <button onClick={handleClick}>Search</button>
          </Form>
        </Col>
      </Row>
      {error.showMsg && (
        <Row>
          <Alert>{error.msg}</Alert>
        </Row>
      )}
      {tickerState.showError && (
        <Row>
          <Alert>{tickerState.errorMsg}</Alert>
        </Row>
      )}
    </>
  );
};

export default TickerSearch;
