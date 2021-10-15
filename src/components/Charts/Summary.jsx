import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../utilities/stockData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataState } from "../../slice/data/dataSlice";

const Summary = ({ ticker }) => {
  console.log("Stock ticker: ", ticker);
  const chartData = useSelector(dataState);

  const [chartObj, setChartObj] = useState({
    exchange: "",
    fullExchangeName: "",
    close: [],
    timestamp: [],
  });

  useEffect(() => {
    console.log("useEffect Fired: ", ticker);
    filterData(ticker);
  }, [ticker]);

  const filterData = (target) => {
    let filtered = chartData.data.filter((el) => el.exchange == target);
    console.log("filtered: ", filtered[0]);
    setChartObj(filtered[0]);
  };
  const chartState = {
    options: {
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        categories: timeConvertArray(chartObj.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...chartObj.close) - 40,
        max: Math.max(...chartObj.close) + 40,
        opposite: true,
        tickAmount: 5,
      },
      title: {
        text: chartObj.exchange,
        align: "left",
      },
      subtitle: {
        text: chartObj.fullExchangeName,
        align: "left",
      },
    },
    series: [
      {
        name: "USD",
        data: chartObj.close,
      },
    ],
  };

  return (
    <Row>
      <Col>
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="area"
          width="500"
        />
      </Col>
    </Row>
  );
};

export default Summary;
