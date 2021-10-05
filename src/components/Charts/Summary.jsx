import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../utilities/stockData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dataState } from "../../slice/data/dataSlice";

const Summary = ({ ticker }) => {
  console.log("Stock ticker: ", ticker);
  const chartData = useSelector(dataState);

  const [ chartObj, setChartObj ] = useState({
      exchange: "",
      fullExchangeName: "",
      close: [],
      timestamp: []
    });

  useEffect(() => {
    console.log("useEffect Fired: ", ticker);
    filterData(ticker);
  }, [ticker]);

  const filterData = (target) => {
    let filtered = chartData.data.filter(el => el.exchange == target);
    console.log("filtered: ", filtered[0]);
    setChartObj(filtered[0]);
  }
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
        categories: timeConvertArray(chartObj.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...chartObj.close) - 500,
        max: Math.max(...chartObj.close) + 100,
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
        name: "series-1",
        data: chartObj.close,
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
