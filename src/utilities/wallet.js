import { authClient } from "./auth";

export const updateHoldings = async () => {
  let response = await authClient.get("/stock/updateHoldings");
  console.log("Response update holdings: ", response.data);
  return response.data.quoteResponse.result;
};

export const purchaseOrder = async (token, order) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.post("/stock/addStock", order, { headers });
    return response.data;
  } catch (err) {
    return err.response;
  }
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
