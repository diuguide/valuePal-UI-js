import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../../utilities/stockData";

const History = ({ data }) => {
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
        categories: data.timeStamp ? timeConvertArray(data.timestamp) : null,
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: data.close ? Math.min(...data.close) : null,
        max: data.close ? Math.max(...data.close): null,
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
        data: data.close ? data.close : null,
      },
    ],
  };

  return (
    <Row>
      {data.timestamp.length > 0 && (
        <Col>
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="line"
            width="500"
          />
        </Col>
      )}
    </Row>
  );
};

export default History;
