import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { walletState } from "../../slice/wallet/walletSlice";
import Loader from "../Loader/Loader";

const MiniTicker = ({ index }) => {
  const walletData = useSelector(walletState);
  const tickerData = useSelector(tickerDataState);

  console.log("ticker data: ", tickerData.ticker);
  return (
    <>
      <Row>
        {tickerData.dataLoaded ? (
          <>
            <Col>{tickerData.data.symbol}</Col>
            <Col> ${tickerData.data.price?.toFixed(2)}</Col>
            <Col></Col>
          </>
        ) : (
          <Loader />
        )}
      </Row>
    </>
  );
};

export default MiniTicker;
