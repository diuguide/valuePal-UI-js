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
          <Col>{dummyData.longName}</Col>
        </Row>
        <Row>
          <Col lg={5}>{dummyData.avgPrice}</Col>
          <Col lg={1}>
            {dummyData.change < 0 ? <div>&#8595;</div> : <div>&#8593;</div>}
          </Col>
          <Col lg={3}>
            <Row>
              <Col>{dummyData.changeAmt}</Col>
            </Row>
            <Row>
              <Col>{dummyData.change}%</Col>
            </Row>
          </Col>
          <Col lg={3}>{dummyData.ticker}</Col>
        </Row>
        <Row>
          <Col>{dummyData.lastUpdated}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TickerResults;
