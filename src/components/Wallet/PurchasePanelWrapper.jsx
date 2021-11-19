import { Row, Col } from "react-bootstrap";
import BuyPanel from "./Buy";
import SellPanel from "./Sell";

const PurchasePanelWrapper = () => {
  return (
    <Row>
      <Col>
        <BuyPanel />
      </Col>
      <Col>
        <SellPanel />
      </Col>
    </Row>
  );
};

export default PurchasePanelWrapper;
