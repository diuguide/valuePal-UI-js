import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { retrieveWal, walletState } from "../../slice/wallet/walletSlice";
import { authState } from "../../slice/auth/authSlice";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const auth = useSelector(authState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveWal(auth.token));
  }, []);

  console.log("Wallet Data: ", walletData);
  return (
    <>
      {walletData.isLoaded && (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <th>Ticker</th>
                <th>Quantity</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Total Value</th>
              </thead>
              <tbody>
                {walletData.wallet.holdings.map((ticker, index) => {
                  return (
                    <tr key={index}>
                      <td>{ticker.ticker}</td>
                      <td>{ticker.quantity}</td>
                      <td>{ticker.price}</td>
                      <td></td>
                      <td>{ticker.totalValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HoldingsTable;
