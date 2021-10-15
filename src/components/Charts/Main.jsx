import { Row, Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { dataState, yahooSummary } from "../../slice/data/dataSlice";
import Summary from "./Summary";
import { useEffect, useState } from "react";

const Main = () => {
  const data = useSelector(dataState);
  const dispatch = useDispatch();

  const [chartValue, setChartValue] = useState("DJI");

  const dispatchData = () => {
    dispatch(yahooSummary());
  };

  useEffect(() => {
    dispatchData();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setChartValue(value);
  };

  const formStyle = {
    width: "500px"
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col>
        <Row>
          <Col className="d-flex justify-content-center">
            <Form style={formStyle}>
              <Form.Select onChange={handleChange}>
                <option>Select a market...</option>
                {data.data.map((el, index) => {
                  if (el.timestamp.length > 0) {
                    return (
                      <option key={index} value={el.exchange}>
                        {el.exchange}
                      </option>
                    );
                  }
                  return null;
                })}
              </Form.Select>
            </Form>
          </Col>
        </Row>
        <Row>
          {data.dataLoaded && (
            <>
              <Col className="d-flex justify-content-center">
                <Summary ticker={chartValue} />
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Main;
