import { Row, Col, Table, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { walletState, userHoldings } from "../../slice/wallet/walletSlice";
import Loader from "../Loader/Loader";
import HoldingRow from "./HoldingRow";

const HoldingsTable = () => {
  const walletData = useSelector(walletState);
  const dispatch = useDispatch();

  const getHoldings = () => {
    dispatch(userHoldings(localStorage.getItem("authorization")));
  };

  const handleClick = () => {
    console.log("CLICK: ");
  };

  useEffect(() => {
    getHoldings();
  }, []);

  const ChangeCell = ({ price, avgPrice }) => {
    const style = {
      container: {
        display: "flex",
        justifyContent: "space-around",
      },
      left: {
        display: "block",
      },
      right: {
        display: "block",
      },
      dollar: {
        color: price - avgPrice >= 0 ? "green" : "red",
      },
      percentage: {
        color: price - avgPrice >= 0 ? "green" : "red",
      },
      arrow: {
        fontSize: "30px",
        fontWeight: "900",
        color: price - avgPrice <= 0 ? "red" : "green",
      },
    };
    return (
      <>
        <div style={style.container}>
          <div style={style.left}>
            <div style={style.dollar}>$ {(price - avgPrice).toFixed(2)}</div>
            <div style={style.percentage}>
              {(((price - avgPrice) / avgPrice) * 100).toFixed(2)}%
            </div>
          </div>
          <div style={style.right}>
            <div style={style.arrow}>
              {price - avgPrice <= 0 ? <div>&#8595;</div> : <div>&#8593;</div>}
            </div>
          </div>
        </div>
      </>
    );
  };

  const TotalCell = ({ ticker }) => {
    const style = {
      container: {
        display: "flex",
        justifyContent: "space-around",
      },
      left: {
        display: "block",
      },
      right: {
        display: "block",
      },
      dollar: {
        color: ticker.price - ticker.avgPrice >= 0 ? "green" : "red",
      },
      percentage: {
        color: ticker.price - ticker.avgPrice >= 0 ? "green" : "red",
      },
      arrow: {
        fontSize: "30px",
        fontWeight: "900",
        color: ticker.price - ticker.avgPrice <= 0 ? "red" : "green",
      },
    };
    return (
      <>
        <div style={style.container}>
          <div style={style.left}>
            <div style={style.dollar}>
              $ {(ticker.price * ticker.quantity).toFixed(2)}
            </div>
            <div style={style.percentage}>
              $
              {(
                ticker.price * ticker.quantity -
                ticker.avgPrice * ticker.quantity
              ).toFixed(2)}
            </div>
          </div>
          <div style={style.right}>
            <div style={style.arrow}>
              {ticker.price - ticker.avgPrice <= 0 ? (
                <div>&#8595;</div>
              ) : (
                <div>&#8593;</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  const rowStyle = {
    ticker: {},
    quantity: {},
    price: {},
    avg_price: {},
    table: {},
    button: {
      height: "20px",
      fontSize: "10px",
      border: "none",
      marginLeft: "20px",
    },
  };

  return (
    <>
      {walletData.holding.isLoaded ? (
        <>
          <Row>
            <Col className="border rounded">
              <Table style={rowStyle.table} hover>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Quantity</th>
                    <th>Current Price</th>
                    <th>Purchase Price (Avg)</th>
                    <th></th>
                    <th>Change</th>
                    <th>Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {walletData.wallet.length > 0 ? (
                    walletData.holding.holdings.map((ticker, index) => {
                      return (
                        <HoldingRow
                        key={index}
                        index={index}
                        ticker={ticker}
                        ChangeCell={ChangeCell}
                        TotalCell={TotalCell}
                        />
                      );
                    })
                  ) : (
                    <tr>
                      <td className="empty-msg">
                        There doesn't seem to be anything here...
                      </td>
                    </tr>
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
