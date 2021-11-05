import { Row, Col, Container } from "react-bootstrap";
import Login from "../Auth/Login";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import TwitterFeed from "../Twitter";
import NewsFeed from "../News";
import TickerSearch from "../TickerSearch";
import TickerResults from "../TickerSearch/Results";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { tickerHistoryState } from "../../slice/data/tickerHistorySlice";
import HistChartWrapper from "../Charts/TickerHistory/Wrapper";

const Welcome = () => {
  const auth = useSelector(authState);
  const tickerData = useSelector(tickerDataState);
  const tickerHistory = useSelector(tickerHistoryState);
  const twitterHandle = ["DowJones", "Nasdaq", "CMEGroup"];
  return (
    <Container>
      <Row>
        <Col className="p-4" lg={6}>
          <TickerSearch />
          {tickerData.dataLoaded && <TickerResults />}
        </Col>
        <Col className="pt-4" lg={6}>
          <HistChartWrapper />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewsFeed />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {twitterHandle.map((tw, index) => {
          return (
            <Col key={index}>
              <TwitterFeed twitterHandle={tw} />;
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Welcome;
