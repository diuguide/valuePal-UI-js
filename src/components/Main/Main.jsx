import { Row, Col, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { dataState, yahooSummary } from "../../slice/data/dataSlice";
import Summary from "../Charts/Summary";
import { useEffect, useState } from "react";

const Main = () => {
  const data = useSelector(dataState);
  const dispatch = useDispatch();

  const [chartValue, setChartValue] = useState("DJI");
  
  useEffect(() => {
    dispatchData();
  }, [chartValue]);

  const dispatchData = () => {
    dispatch(yahooSummary());
  };

  const handleClick = (e) => {
    const { value } = e.target;
    setChartValue(value);
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <Form>
              <Form.Select onChange={handleClick}>
                <option value="DJI">DJI</option>
                <option value="MEX">MEX</option>
                <option value="OSA">OSA</option>
                <option value="SAO">SAO</option>
                <option value="BUE">BUE</option>
                <option value="HKE">HKSE</option>
              </Form.Select>
            </Form>
          </Col>
        </Row>
        <Row>
          {data.dataLoaded && (
            <>
              <Col lg={4}>
                <Summary stockData={chartValue} />
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Main;
