import { authClient } from "./auth";

export const summaryData = async () => {
  let response = await authClient.get("/calls/getSummary");
  return response;
};

export const newsData = async () => {
  let response = await authClient.get("/calls/getNewsFeed");
  return response;
};

export const tickerData = async (ticker) => {
  let response = await authClient.post(`/calls/getQuoteYH?ticker=${ticker}`);
  console.log("Ticker search response: ", response.data[0]);
  return response;
};

export const tickerHistory = async (api, interval, range, ticker) => {
  let response = await authClient.post(
    `/calls/getHistory?api=${api}&interval=${interval}&range=${range}&ticker=${ticker}`
  );
  return response;
};

export const timeConvertArray = (ar) => {
  let newAr = [];
  ar.forEach((each) => {
    newAr.push(timeConverter(each));
  });
  return newAr;
};

export const timeConverter = (unix) => {
  let num = parseInt(unix);
  let date = new Date(num * 1000);

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

export const caluculateChange = (currentPrice, purchasePrice) => {
  let dif = Math.abs(currentPrice-purchasePrice);
  let perc = dif/purchasePrice;
  let result;
  if(purchasePrice > currentPrice) {
    result = Math.abs(perc) * -1;
    result *= 100;
    return result.toFixed(2);
  } else {
    perc *= 100;
    return perc.toFixed(2);
  }
}
