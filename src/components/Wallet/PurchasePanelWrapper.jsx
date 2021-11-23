import { Row, Col, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { walletState, hideErrors } from "../../slice/wallet/walletSlice";
import BuyPanel from "./Buy";
import SellPanel from "./Sell";

const PurchasePanelWrapper = () => {
  const walletData = useSelector(walletState);
  const dispatch = useDispatch();
  
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
        <Alert onClose={() => dispatch(hideErrors())} dismissible>{walletData.purchasePanel.msg.message}</Alert>
      )}
    </>
  );
};

export default PurchasePanelWrapper;
