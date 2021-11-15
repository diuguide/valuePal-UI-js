import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { walletState } from "../../slice/wallet/walletSlice";

const Wallet = () => {
  const walletData = useSelector(walletState);

  const styling = {
    container: {
      borderRadius: "10px",
      padding: "10px",
    },
    font: {
      fontSize: "20px",
      color: "white",
    },
    value: {
      border: "1px solid black",
      backgroundColor: "white",
    },
  };

  return (
    <Row style={styling.container} className="bg-dark">
      <Col className="d-flex">
        <div style={styling.font}>Balance: </div>
        <div style={styling.value}>{walletData.wallet.totalCash}</div>
      </Col>
      <Col className="d-flex">
        <div style={styling.font}>Assets: </div>
        <div style={styling.value}>{walletData.wallet.totalValue}</div>
      </Col>
      <Col className="d-flex">
        <div style={styling.font}>Total Value: </div>
        <div style={styling.value}>
          {walletData.wallet.totalValue + walletData.wallet.totalCash || null} 
        </div>
      </Col>
    </Row>
  );
};

export default Wallet;
