import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { retrieveWal, walletState } from "../../slice/wallet/walletSlice";
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
    updateHoldingsTable();
  }

  console.log("Wallet Data: ", walletData);
  return (
    <>
      {walletData.isLoaded && (
        <>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <th>Ticker</th>
                <th>Quantity</th>
                <th>Current Price</th>
                <th>Change</th>
                <th>Total Value</th>
              </thead>
              <tbody>
                {walletData.wallet.holdings.map((ticker, index) => {
                  return (
                    <tr key={index}>
                      <td>{ticker.ticker}</td>
                      <td>{ticker.quantity}</td>
                      <td>{ticker.price}</td>
                      <td>{ticker.change && ticker.change}</td>
                      <td>{ticker.totalValue}</td>
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
