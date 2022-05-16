import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { timeConverterFull } from "../../utilities/stockData";

const TickerResults = () => {
  const tickerData = useSelector(tickerDataState);

  const rowStyle = {
    change: {
      color: tickerData.data.change > 0 ? "green" : "red",
    },
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col className="fs-1 fw-bold">{tickerData.data.longName}</Col>
        </Row>
        <Row className="border-top border-bottom">
          <Col lg={5} className="fs-1 fw-bold">
            ${tickerData.data.price?.toFixed(2)}
          </Col>
          <Col lg={1} className="fs-1 fw-bold">
            {tickerData.data.change < 0 ? (
              <div>&#8595;</div>
            ) : (
              <div>&#8593;</div>
            )}
          </Col>
          <Col lg={3}>
            <Row>
              <Col style={rowStyle.change} className="fs-4">
                {tickerData.data.change?.toFixed(2)}
              </Col>
            </Row>
            <Row>
              <Col style={rowStyle.change} className="fs-4">
                {tickerData.data.changePercent?.toFixed(2)}%
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="fs-1">
            {tickerData.data.symbol}
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            Last Updated: {timeConverterFull(tickerData.data.time)} EDT
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TickerResults;
