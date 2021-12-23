import { Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerHistoryState } from "../../../slice/data/tickerHistorySlice";
import History from "./Chart";

const HistChartWrapper = () => {
  const tickerHist = useSelector(tickerHistoryState);
  return (
    <Row>
      {!tickerHist.showError ? (
        <Col>{tickerHist.dataLoaded && <History data={tickerHist.data} />}</Col>
      ) : (
        <Col>
          <Alert>{tickerHist.errorMsg}</Alert>
        </Col>
      )}
    </Row>
  );
};

export default HistChartWrapper;
