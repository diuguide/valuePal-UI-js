import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import TickerSearch from "../TickerSearch";
import TickerResults from "../TickerSearch/TickerResults";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import HistChartWrapper from "../Charts/TickerHistory/Wrapper";
import Register from "../Auth";

import PurchasePanelWrapper from "../Wallet/PurchasePanelWrapper";
import TableWrapper from "./TableWrapper";

const Welcome = () => {
  const auth = useSelector(authState);
  const tickerData = useSelector(tickerDataState);

  const styleObj = {
    tableWrapper : {
        padding: "10px",
        maxHeight: "400px"
    }
  }

  return (
    <>
      <Container>
        {auth.isAuthenticated ? (
          <>
            <Row className="bg-light">
              <Col className="p-4" lg={6}>
                <TickerSearch />
                {tickerData.dataLoaded && <TickerResults />}
                {auth.isAuthenticated && tickerData.dataLoaded && (
                  <PurchasePanelWrapper />
                )}
              </Col>
              <Col className="pt-4" lg={6}>
                {/* <HistChartWrapper /> */}
              </Col>
            </Row>
            <>
              {auth.isAuthenticated && (
                <Row style={styleObj.tableWrapper} className="border rounded-3">
                  <Col>
                    <TableWrapper />
                  </Col>
                </Row>
              )}
            </>
          </>
        ) : (
          <Register />
        )}
      </Container>
    </>
  );
};

export default Welcome;
