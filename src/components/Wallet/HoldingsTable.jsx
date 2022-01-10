import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  walletState,
  updateHoldingsTableFunc,
  getUserData,
} from "../../slice/wallet/walletSlice";
import { caluculateChange } from "../../utilities/stockData";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData(localStorage.getItem("authorization")));
  }, []);

  const updateHoldingsTableButton = () => {
    dispatch(updateHoldingsTableFunc());
    dispatch(getUserData(localStorage.getItem("authorization")));
  };

  const rowStyle = {
    ticker: {
      fontWeight: 900,
    },
    quantity: {},
    price: {},
    avg_price: {},
    change: {
      color: "green",
    },
    totalValue: {},
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
                  {walletData.wallet.holdings &&
                    walletData.wallet.holdings.map((ticker, index) => {
                      return (
                        <tr key={index}>
                          <td style={rowStyle.ticker}>{ticker.ticker}</td>
                          <td style={rowStyle.quantity}>{ticker.quantity}</td>
                          <td style={rowStyle.price}>
                            ${ticker.price.toFixed(2)}
                          </td>
                          <td style={rowStyle.avg_price}>
                            {ticker.avg_price
                              ? "$" + ticker.avg_price.toFixed(2)
                              : null}
                          </td>
                          <td style={rowStyle.change} id="change">
                            {caluculateChange(ticker.price, ticker.avg_price)}
                          </td>
                          <td style={rowStyle.totalValue}>
                            {ticker.totalValue.toFixed(2)}
                          </td>
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
