import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../utilities/stockData";

const Summary = ({ stockData }) => {
  const chartState = {
    options: {
      chart: {
        type: "area",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        categories: timeConvertArray(stockData.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...stockData.close) - 500,
        max: Math.max(...stockData.close) + 100,
        opposite: true,
        tickAmount: 5,
      },
      title: {
        text: stockData.exchange,
        align: "left",
      },
      subtitle: {
        text: stockData.fullExchangeName,
        align: "left",
      },
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
      <Col style={{ width: "200px" }}>
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="bar"
        />
      </Col>
    </Row>
  );
};

export default Summary;
