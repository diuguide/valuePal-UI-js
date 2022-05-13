import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { walletState } from "../../slice/wallet/walletSlice";
import Loader from "../Loader/Loader";

const Wallet = () => {
  const walletData = useSelector(walletState);

  const styling = {
    container: {
      paddingTop: "10px",
      paddingBottom: "5px",
    },
    font: {
      color: "green",
      fontSize: "12px",
      fontWeight: "700",
    },
    value: {
      fontSize: "12px",
      paddingLeft: "5px",
    },
  };

  const calculateTotalAssetValue = () => {
    let totalValue = 0;
    walletData.holding.holdings.forEach((el) => {
      totalValue += el.price * el.quantity;
    });
    return totalValue;
  };

  return (
    <>
      {walletData.isLoaded ? (
        <Row style={styling.container}>
          <Col className="d-flex">
            <div style={styling.font}>CASH </div>
            <div style={styling.value}>
              ${walletData.user.totalCash.toFixed(2)}
            </div>
          </Col>
          <Col className="d-flex">
            <div style={styling.font}>ASSETS </div>
            <div style={styling.value}>
              ${calculateTotalAssetValue().toFixed(2)}
            </div>
          </Col>
          <Col className="d-flex">
            <div style={styling.font}>TOTAL </div>
            <div style={styling.value}>
              $
              {(walletData.user.totalCash + calculateTotalAssetValue()).toFixed(
                2
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Wallet;
