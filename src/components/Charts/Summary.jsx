import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../utilities/stockData";

const Summary  = ({ stockData }) => {
  console.log("data inside summary", stockData);

  
  const chartState = {
    
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: timeConvertArray(stockData.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...stockData.close) - 10,
        max: Math.max(...stockData.close) + 10,
      },
      
      title: {
        text: stockData.exchange,
      }
    },
    series: [
      {
        name: "series-1",
        data: stockData.close,
      },
    ],
  };

  return (
    <Row>
      <Col>
        <Chart
        
          options={chartState.options}
          series={chartState.series}
          type="bar"
          width="500"
        />
      </Col>
    </Row>
  );
};

export default Summary;
