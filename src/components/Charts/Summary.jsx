import { Row, Col } from "react-bootstrap";
import Chart from "react-apexcharts";
import { timeConvertArray } from "../../utilities/stockData";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { dataState } from "../../slice/data/dataSlice";

const Summary = ({ stockData }) => {
  console.log("Stock data: ", stockData);
  const data = useSelector(dataState);
  const chartRef = useRef();

  useEffect(() => {
    chartRef.current = filterData(stockData);
  }, [stockData]);

  const filterData = (value) => {
    return data.data.filter(el => el.exchange == value);
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
        categories: timeConvertArray(chartRef.current.timestamp),
        labels: {
          show: false,
        },
      },
      yaxis: {
        min: Math.min(...chartRef.current.close) - 500,
        max: Math.max(...chartRef.current.close) + 100,
        opposite: true,
        tickAmount: 5,
      },
      title: {
        text: chartRef.current.exchange,
        align: "left",
      },
      subtitle: {
        text: chartRef.current.fullExchangeName,
        align: "left",
      },
    },
    series: [
      {
        name: "series-1",
        data: chartRef.current.close,
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
