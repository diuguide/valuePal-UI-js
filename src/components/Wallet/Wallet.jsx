import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { walletState } from "../../slice/wallet/walletSlice";
import Loader from "../Loader/Loader";

const Wallet = () => {
  const walletData = useSelector(walletState);

  const styling = {
    container: {
      
    },
    font: {
      
    },
    value: {
      
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
        <Row style={styling.container} className="">
          <Col className="d-flex">
            <div style={styling.font}>Cash: </div>
            <div style={styling.value}>
              {walletData.user.totalCash.toFixed(2)}
            </div>
          </Col>
          <Col className="d-flex">
            <div style={styling.font}>Assets: </div>
            <div style={styling.value}>
              {calculateTotalAssetValue().toFixed(2)}
            </div>
          </Col>
          <Col className="d-flex">
            <div style={styling.font}>Value: </div>
            <div style={styling.value}>
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
