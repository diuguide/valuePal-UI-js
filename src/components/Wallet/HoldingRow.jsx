import OrderModal from "./OrderModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  tickerDataState,
  yahooTickerSearch,
} from "../../slice/data/tickerSearchSlice";
import { yahooTickerHistory } from "../../slice/data/tickerHistorySlice";
import { authState } from "../../slice/auth/authSlice";

const HoldingRow = ({ index, ticker, ChangeCell, TotalCell, walletData }) => {
  const auth = useSelector(authState);
  const tickerData = useSelector(tickerDataState);
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
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("click");
    if (ticker != null) {
      setData(ticker.ticker);

      dispatch(yahooTickerSearch(ticker.ticker));
      
      setTimeout(() => {
        dispatch(
          yahooTickerHistory({ api: 2, interval: "1m", range: "1d", ticker:ticker.ticker })
        );
      }, 500);

      // returns and activates a modal, needs to return from here so latest data is included and not rendered ahead of time below
      handleShow();
    }
    handleShow();
  };

  return (
    <tr key={index}>
      <td style={rowStyle.ticker}>{ticker.ticker}</td>
      <td style={rowStyle.quantity}>{ticker.quantity}</td>
      <td style={rowStyle.price}>{ticker.price.toFixed(2)}</td>
      <td style={rowStyle.avg_price}>{ticker.avgPrice.toFixed(2)}</td>
      <td>
        <button id={index} onClick={handleClick}>
          ++ Order
        </button>
        {auth.isAuthenticated && (
          <OrderModal
            show={show}
            setShow={setShow}
            index={index}
            data={data}
            walletData={walletData}
          />
        )}
      </td>
      <td style={rowStyle.change}>
        <ChangeCell price={ticker.price} avgPrice={ticker.avgPrice} />
      </td>
      {/* <td style={rowStyle.change}>{(ticker.price - ticker.avgPrice).toFixed(2)}</td> */}
      <td style={rowStyle.totalValue}>
        <TotalCell ticker={ticker} />
      </td>
    </tr>
  );
};

export default HoldingRow;
