import { Row, Col, Container } from "react-bootstrap";

const TickerResults = () => {
  const dummyData = {
    avgPrice: 2830.43,
    holding_id: 1,
    longName: "Alphabet Inc.",
    price: 2330.31,
    quantity: 1,
    ticker: "GOOG",
    wallet_id: 1,
    change: -0.34,
    lastUpdated: "5/13/2022, 4:00:04 PM EDT",
    changeAmt: 200,
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col className="fs-1 fw-bold">{dummyData.longName}</Col>
        </Row>
        <Row className="border-top border-bottom">
          <Col lg={5} className="fs-1 fw-bold">
            ${dummyData.avgPrice}
          </Col>
          <Col lg={1} className="fs-1 fw-bold">
            {dummyData.change < 0 ? <div>&#8595;</div> : <div>&#8593;</div>}
          </Col>
          <Col lg={3}>
            <Row>
              <Col className="fs-4">{dummyData.changeAmt.toFixed(2)}</Col>
            </Row>
            <Row>
              <Col className="fs-4">{dummyData.change}%</Col>
            </Row>
          </Col>
          <Col lg={3} className="fs-1">
            {dummyData.ticker}
          </Col>
        </Row>
        <Row>
          <Col>{dummyData.lastUpdated}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TickerResults;
