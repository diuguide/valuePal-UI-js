import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { tickerDataState } from "../../slice/data/tickerSearchSlice";
import { timeConverterFull } from "../../utilities/stockData";
const TickerResults = () => {
  const tickerData = useSelector(tickerDataState);
  const quoteStyle = {
    longName: {
      fontSize: "28px",
      fontWeight: "700",
      borderBottom: "2px solid black",
    },
    currentPrice: {
      fontSize: "56px",
      fontWeight: "700",
    },
    symbol: {
      fontSize: "56px",
      fontWeight: "300",
      textAlign: "center",
      width: "100%",
    },
    time: {
      borderTop: "1px solid black",
    },
    marketChange: {
      padding: "15px",
      arrow: {
        fontSize: "56px",
        fontWeight: "900",
        marginLeft: "10px",
        color: tickerData.data.change < 0 ? "red" : "green",
      },
      percentage: {
        fontSize: "20px",
        fontWeight: "600",
        color: tickerData.data.changePercent < 0 ? "red" : "green",
      },
      value: {
        fontSize: "20px",
        fontWeight: "600",
        color: tickerData.data.change < 0 ? "red" : "green",
      },
    },
  };

  return (
    <Row>
      <Col>
        <div style={quoteStyle.longName}>{tickerData.data.longName}</div>
        <div className="d-flex">
          <div style={quoteStyle.currentPrice}>
            ${tickerData.data.price?.toFixed(2)}
          </div>
          <div style={quoteStyle.marketChange.arrow}>
            {tickerData.data.change < 0 ? (
              <div>&#8595;</div>
            ) : (
              <div>&#8593;</div>
            )}
          </div>
          <div style={quoteStyle.marketChange}>
            <div style={quoteStyle.marketChange.value}>
              {tickerData.data.change?.toFixed(2)}
            </div>
            <div style={quoteStyle.marketChange.percentage}>
              {tickerData.data.changePercent?.toFixed(2)}%
            </div>
          </div>
          <div style={quoteStyle.symbol}>{tickerData.data.symbol}</div>
        </div>
        <div style={quoteStyle.time}>
          Last Updated: {timeConverterFull(tickerData.data.time)} EDT
        </div>
      </Col>
    </Row>
  );
};

export default TickerResults;
