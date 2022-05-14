import { Row, Col } from "react-bootstrap";

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
  return (
    <tr key={index}>
      <td style={rowStyle.ticker}>{ticker.ticker}</td>
      <td style={rowStyle.quantity}>{ticker.quantity}</td>
      <td style={rowStyle.price}>{ticker.price.toFixed(2)}</td>
      <td style={rowStyle.avg_price}>
        {ticker.avgPrice.toFixed(2)}
      </td>
      <td></td>
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
