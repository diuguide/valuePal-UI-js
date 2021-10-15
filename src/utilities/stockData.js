import { authClient } from "./auth";

export const summaryData = async () => {
  let response = await authClient.get("/calls/getSummary");
  return response;
}

export const newsData = async () => {
  let response = await authClient.get("/calls/getNewsFeed");
  return response;
}

export const tickerData = async (ticker) => {
  console.log("ticker inside util: ", ticker);
  let response = await authClient.post(`/calls/ticker?ticker=${ticker}`);
  console.log("server response: " + response);
  return response;
}

export const timeConvertArray = (ar) => {
  let newAr = [];
  ar.forEach((each) => {
    newAr.push(timeConverter(each));
  })
  return newAr;
}

export const timeConverter = (unix) => {
  let num = parseInt(unix);
  let date = new Date(num * 1000);
  console.log("testing: ", date.toLocaleString());
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};

export const timeConverterFull = (unix) => {
  let num = parseInt(unix);
  let date = new Date(num * 1000);
  return date.toLocaleString();
};