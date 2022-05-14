import { Button } from "react-bootstrap";

const HoldingRow = ({ index, ticker, ChangeCell, TotalCell }) => {
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

  const handleClick = (e) => {
    console.log("click click tick boom",e.target.id);
  };

  return (
    <tr key={index}>
      <td style={rowStyle.ticker}>{ticker.ticker}</td>
      <td style={rowStyle.quantity}>{ticker.quantity}</td>
      <td style={rowStyle.price}>{ticker.price.toFixed(2)}</td>
      <td style={rowStyle.avg_price}>{ticker.avgPrice.toFixed(2)}</td>
      <td>
        <button id={index} onClick={handleClick}>++ Order</button>
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
