import { authClient } from "./auth";

export const updateHoldings = async () => {
  let response = await authClient.get("/stock/updateHoldings");
  return response.data.quoteResponse.result;
};

export const getUserOrders = async (token) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.get("/users/getUserOrders", { headers });
    return response;
  } catch (err) {
    console.log("error getuserOrders: ", err.response);
    return err.response;
  }
};

export const getUserHoldings = async (token) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.get("/users/getUserHoldings", { headers });
    console.log("getUserHoldings: ", response);
    return response;
  } catch (err) {
    console.log("error getuserHoldings: ", err.response);
    return err.response;
  }
};

export const purchaseOrder = async (token, order) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.post("/stock/addStock", order, { headers });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const sellHoldingOrder = async (token, order) => {
  let headers = {
    Authorization: token,
  };
  let response;
  try {
    response = await authClient.post("/stock/sellStock", order, { headers });
    return response;
  } catch (err) {
    return err.response;
  }
};
