import { Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { walletState, userHoldings } from "../../slice/wallet/walletSlice";
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
      fontSize: "32px"
    },
    quantity: {},
    price: {},
    avg_price: {},
    change: {},
    totalValue: {
      fontSize: "32px",
    },
  };

  const ChangeCell = ({ price, avgPrice }) => {
    const style = {
      container: {
        display: "flex",
        justifyContent: "space-around"
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
            {price - avgPrice <= 0 ? (
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
                  {walletData.wallet.length > 0 ? (
                    walletData.holding.holdings.map((ticker, index) => {
                      return (
                        <tr key={index}>
                          <td style={rowStyle.ticker}>{ticker.ticker}</td>
                          <td style={rowStyle.quantity}>{ticker.quantity}</td>
                          <td style={rowStyle.price}>
                            {ticker.price.toFixed(2)}
                          </td>
                          <td style={rowStyle.avg_price}>
                            {ticker.avgPrice.toFixed(2)}
                          </td>
                          <td style={rowStyle.change}>
                            <ChangeCell
                              price={ticker.price}
                              avgPrice={ticker.avgPrice}
                            />
                          </td>
                          {/* <td style={rowStyle.change}>{(ticker.price - ticker.avgPrice).toFixed(2)}</td> */}
                          <td style={rowStyle.totalValue}>
                            {(ticker.price * ticker.quantity).toFixed(2)}
                          </td>
                        </tr>
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
