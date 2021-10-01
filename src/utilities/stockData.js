import axios from "axios";
import { authClient } from "./auth";

export const summaryData = async () => {
  let response = await authClient.get("/calls/getSummary");
  console.log("Response summary data: ", response);
  return response;
}  

export const yahoo = async (params, endpoint) => {
  let options = {
    method: "GET",
    url: `https://apidojo-yahoo-finance-v1.p.rapidapi.com/${endpoint}`,
    params: params,
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_YAHOO_API,
      "x-rapidapi-host": process.env.REACT_APP_YAHOO_HOST,
    },
  };
  
  let dataObject = {
    exchangeName: "",
    close: [],
    timestamp: [],
  };

  await axios
    .request(options)
    .then(function (response) {
      console.log(
        "response: ",
        response.data.marketSummaryAndSparkResponse.result
      );
      dataObject.exchangeName = response.data.marketSummaryAndSparkResponse.result[8].shortName;
      dataObject.close =
        response.data.marketSummaryAndSparkResponse.result[8].spark.close;
      let timeData =
        response.data.marketSummaryAndSparkResponse.result[8].spark.timestamp;
      timeData.map((time) => dataObject.timestamp.push(timeConverter(time)));
      console.log("dataObject: ", dataObject);
    })
    .catch(function (error) {
      console.error(error);
    });
  return dataObject;
};

export const timeConvertArray = (ar) => {
  let newAr = [];
  ar.forEach((each) => {
    newAr.push(timeConverter(each));
  })
  return newAr;
}

const timeConverter = (unix) => {
  let num = parseInt(unix);
  let date = new Date(num * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};
