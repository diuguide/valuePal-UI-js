import { Row, Col, Button } from "react-bootstrap";
import { authState } from "../../slice/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { dataState, yahooSummary } from "../../slice/data/dataSlice";
import Summary from "../Charts/Summary";



const Main = () => {
  const auth = useSelector(authState);
  const data = useSelector(dataState);
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("click");
    dispatch(yahooSummary());
  };
  return (
    <>
      {auth.isAuthenticated ? (
        <Row>
          <Col>
            <h1>main test</h1>
            <Button onClick={handleClick}>Click</Button>
            {data.dataLoaded &&
            <> 
            {data.data.map((market, index) => {
                return (
                   <Summary stockData={market} /> 
                )
            })}
            </>
            }
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h1>Please log in to view this content!</h1>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Main;
