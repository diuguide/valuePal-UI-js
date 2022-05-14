import OrderModal from "./OrderModal";
import { useState } from "react";

const HoldingRow = ({ index, ticker, ChangeCell, TotalCell, walletData }) => {
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

  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const handleShow = () => setShow(true);

  const handleClick = (e) => {
    e.preventDefault();
    setData(e.target.id);
    console.log("click click tick boom", e.target.id);
    // returns and activates a modal, needs to return from here so latest data is included and not rendered ahead of time below
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
        <OrderModal show={show} setShow={setShow} data={data} walletData={walletData}/>
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
