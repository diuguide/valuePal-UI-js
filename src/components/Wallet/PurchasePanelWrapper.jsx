import { Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { walletState } from "../../slice/wallet/walletSlice";
import BuyPanel from "./Buy";
import SellPanel from "./Sell";

const PurchasePanelWrapper = () => {
  const walletData = useSelector(walletState);
  return (
    <>
      <Row>
        <Col>
          <BuyPanel />
        </Col>
        <Col>
          <SellPanel />
        </Col>
      </Row>
      {walletData.purchasePanel.msg.showMsg && (
        <Alert>{walletData.purchasePanel.msg.message}</Alert>
      )}
    </>
  );
};

export default PurchasePanelWrapper;
