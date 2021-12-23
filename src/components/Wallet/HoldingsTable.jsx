import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { walletState, updateHoldingsTableFunc, getUserData } from "../../slice/wallet/walletSlice";
import { caluculateChange } from "../../utilities/stockData";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(localStorage.getItem('authorization')));
  }, []);

  const updateHoldingsTableButton = () => {
    dispatch(updateHoldingsTableFunc());
    dispatch(getUserData(localStorage.getItem('authorization')));
  };

  return (
    <>
      {walletData.isLoaded && (
        <>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Quantity</th>
                    <th>Current Price</th>
                    <th>Purchase Price (Avg)</th>
                    <th>Change</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {walletData.wallet.holdings.map((ticker, index) => {
                    return (
                      <tr key={index}>
                        <td>{ticker.ticker}</td>
                        <td>{ticker.quantity}</td>
                        <td>{ticker.price.toFixed(2)}</td>
                        <td>{ticker.avg_price ? ticker.avg_price.toFixed(2) : null}</td>
                        <td>{caluculateChange(ticker.price, ticker.avg_price)}</td>
                        <td>{ticker.totalValue.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <button onClick={updateHoldingsTableButton}>Update</button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HoldingsTable;
