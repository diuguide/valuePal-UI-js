import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../../utilities/stockData";

const History = ({data}) => {
  
  const chartState = {
    options: {
      dataLabels: {
        enabled: false,
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
        categories: timeConvertArray(data.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...data.close),
        max: Math.max(...data.close),
        opposite: true,
        tickAmount: 5,
      },
      title: {
        text: "",
        align: "left",
      },
      subtitle: {
        text: "",
        align: "left",
      },
    },
    series: [
      {
        name: "USD",
        data: data.close,
      },
    ],
  };

  return (
    <Row>
      <Col>
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="line"
          width="500"
        />
      </Col>
    </Row>
  );
};

export default History;
