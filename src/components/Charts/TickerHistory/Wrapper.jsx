import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerHistoryState } from "../../../slice/data/tickerHistorySlice";
import History from "./Chart";

const HistChartWrapper = () => {
  const tickerHist = useSelector(tickerHistoryState);
  return (
    <Row>
      <Col>{tickerHist.dataLoaded && <History data={tickerHist.data} />}</Col>
    </Row>
  );
};

export default HistChartWrapper;
