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

  return (
    <Row className="p-4">
      <Col lg={6}>
        <Row>
          <Col>
            <Form>
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
              <Col>
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
