import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { retrieveWal, walletState, updateHoldingsTableFunc } from "../../slice/wallet/walletSlice";
import { authState } from "../../slice/auth/authSlice";
import { updateHoldingsTable } from "../../utilities/wallet";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const auth = useSelector(authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveWal(auth.token));
  }, []);

  const updateHoldingsTableButton = () => {
    dispatch(updateHoldingsTableFunc());
    dispatch(retrieveWal(auth.token));
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
                        <td>{ticker.avg_price}</td>
                        <td>{ticker.change && ticker.change.toFixed(2)}</td>
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
