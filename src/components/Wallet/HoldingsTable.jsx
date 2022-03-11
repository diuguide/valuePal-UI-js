import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  walletState,
  userHoldings,
} from "../../slice/wallet/walletSlice";
import { caluculateChange } from "../../utilities/stockData";
import Loader from "../Loader/Loader";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const dispatch = useDispatch();

  const getHoldings = () => {
    dispatch(userHoldings(localStorage.getItem("authorization")));
  };

  useEffect(() => {
    getHoldings();
  }, []);

  const rowStyle = {
    ticker: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      fontWeight: 900,
      fontSize: "32px",
    },
    quantity: {},
    price: {},
    avg_price: {},
    change: {
      color: "green",
      fontWeight: 900,
    },
    totalValue: {
      fontSize: "32px",
    },
  };

  return (
    <>
      {walletData.holding.isLoaded ? (
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
                  {walletData.wallet.holdings ?
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
                    }) : (
                      <div className="empty-msg">There doesn't seem to be anything here...</div>
                    )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default HoldingsTable;
