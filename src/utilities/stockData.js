import { authClient } from "./auth";

export const summaryData = async () => {
  let response = await authClient.get("/calls/getSummary");
  return response;
}

export const newsData = async () => {
  let response = await authClient.get("/calls/getNewsFeed");
  return response;
}

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
