import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import TickerSearch from "../TickerSearch";
import TickerResults from "../TickerSearch/Results";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import HistChartWrapper from "../Charts/TickerHistory/Wrapper";
import HoldingsTable from "../Wallet/HoldingsTable";
import Wallet from "../Wallet/Wallet";
import PurchasePanelWrapper from "../Wallet/PurchasePanelWrapper";
import TableWrapper from "./TableWrapper";

const Welcome = () => {
  const auth = useSelector(authState);
  const tickerData = useSelector(tickerDataState);

  return (
    <Container>
      <Row className="bg-light">
        <Col className="p-4" lg={6}>
          <TickerSearch />
          {tickerData.dataLoaded && <TickerResults />}
          {auth.isAuthenticated && tickerData.dataLoaded && (
            <PurchasePanelWrapper />
          )}
          {auth.isAuthenticated && <Wallet></Wallet>}
        </Col>
        <Col className="pt-4" lg={6}>
          <HistChartWrapper />
        </Col>
      </Row>
      {auth.isAuthenticated && (
        <Row className="bg-light">
          <Col>
            <TableWrapper />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Welcome;
