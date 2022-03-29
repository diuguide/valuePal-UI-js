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
      color: "white",
    },
    value: {
      marginLeft: "5px",
      padding: "0px 6px",
      border: "1px solid black",
      borderRadius: "5px",
      backgroundColor: "white",
    },
  };

  const calculateTotalAssetValue = () => {
    console.log("walletData.holdings: ", walletData.holding.holdings);
    console.log("walletData.wallet: ", walletData.wallet);
    if (walletData.wallet.length > 0 && walletData.wallet != null) {
      walletData.wallet.forEach((el) => {
        console.log(el);
        console.log(
          "filter result",
          walletData.holding.holdings.filter((elm) => elm.symbol == el.ticker)
        );
        let thing = walletData.holding.holdings.filter((elm) => elm.symbol == el.ticker);
        console.log("thing:", thing);
       
      });
    }
  };

  return (
    <Row style={styling.container} className="bg-dark mt-2">
      <Col className="d-flex">
        <div style={styling.font}>Cash: </div>
        <div style={styling.value}>{walletData.user.totalCash.toFixed(2)}</div>
      </Col>
      <Col className="d-flex">
        <div style={styling.font}>Assets: </div>
        <div style={styling.value}>{calculateTotalAssetValue()}</div>
      </Col>
      <Col className="d-flex">
        <div style={styling.font}>Value: </div>
        <div style={styling.value}></div>
      </Col>
    </Row>
  );
};

export default Wallet;
