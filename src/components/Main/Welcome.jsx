import { Row, Col, Container } from "react-bootstrap";
import Login from "../Auth/Login";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import Main from "../Charts/Main";
import TwitterFeed from "../Twitter";
import NewsFeed from "../News";
import TickerSearch from "../TickerSearch";
import TickerResults from "../TickerSearch/Results";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";

const Welcome = () => {
  const auth = useSelector(authState);
  const tickerData = useSelector(tickerDataState);
  const twitterHandle = ["DowJones", "Nasdaq", "CMEGroup"];
  return (
    <Container>
      <Row>
        <Col className="p-4" lg={6}>
          <TickerSearch />
          {tickerData.dataLoaded && <TickerResults />}
        </Col>
        <Col className="pt-4" lg={6}>
          <Main />
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
