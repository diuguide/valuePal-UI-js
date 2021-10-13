import { Row, Col, Container } from "react-bootstrap";
import Login from "../Auth/Login";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { authState } from "../../slice/auth/authSlice";
import Main from "../Charts/Main";
import TwitterFeed from "../Twitter";

const Welcome = () => {
  const auth = useSelector(authState);
  const twitterHandle = ["DowJones", "Nasdaq", "CMEGroup"];
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {auth.isLoading ? <Loader /> : <Login />}
        </Col>
      </Row>
      <Row>
        <Col>
          <Main />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        {twitterHandle.map((tw, index) => {
          return (
            <Col>
              <TwitterFeed key={index} twitterHandle={tw} />;
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Welcome;
