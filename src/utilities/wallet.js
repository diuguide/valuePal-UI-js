import { authClient } from "./auth";

class HoldingsUpdateDTO {
  ticker = "";
  price = 0;
  change = 0;
}

export const retrieveWallet = async (token) => {
  let headers = {
    Authorization: token,
  };
  let response = await authClient.get("/stock/retrieve", { headers });
  return response.data;
};

export const updateHoldings = async () => {
  let response = await authClient.get("/stock/updateHoldings");
  console.log("Response update holdings: ", response.data);
  return response.data.quoteResponse.result;
};

export const updateHoldingsTable = async () => {
  let holdings = await updateHoldings();
  let holdingsArray = [];
  for (let i = 0; i < holdings.length; i++) {
    let holdingsDTO = new HoldingsUpdateDTO();
    holdingsDTO.ticker = holdings[i].symbol;
    holdingsDTO.price = holdings[i].regularMarketPrice;
    holdingsDTO.change = holdings[i].regularMarketChange;
    holdingsArray.push(holdingsDTO);
  }
  let response = await authClient.post("/stock/saveWallet", holdingsArray);
  console.log("holdings: ", response);
  return response;
};

export const purchaseOrder = async (token, order) => {
  let headers = {
    Authorization: token,
  };

  let response = await authClient.post("/stock/addStock", order, { headers });

  return response.data;
};

export const sellHoldingOrder = async (token, order) => {
  console.log("Token: ", token);
  console.log("SELL Order inside wallet.js: ", order);
  let headers = {
    Authorization: token,
  };
  let response;
  try {
    response = await authClient.post("/stock/sellStock", order, { headers });
    console.log("Response Sell Stock: ", response.data);
    return response;
  } catch (err) {
    
    return err.response;
  }
};
