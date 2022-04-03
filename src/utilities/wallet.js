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
    return err.response;
  }
};

export const getUserHoldings = async (token) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.get("/users/getUserHoldings", { headers });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getUserCash = async (token) => {
  let headers = {
    Authorization: token,
  };
  try {
    let response = await authClient.get("/users/getUserCash", { headers });
    return response;
  } catch (err) {
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

const getAvgPrice = (token, ticker) => {

  let headers = {
    Authorization: token,
  };
  let response;
  try {
    response = await authClient.post("/stock/avgPrice", ticker, { headers });
    return response.data.avgPrice;
  } catch (err) {
    return err.response;
  }
  
}

export const createHoldingRow = (response, responseCall) => {
  let rowObject = {
    wallet_id: 0,
    holding_id: 0,
    ticker: "",
    longName: "",
    price: 0,
    quantity: 0,
  };
  let responseEntity = [];
  if (response != null && responseCall != null) {
    response.data.forEach((el) => {
      let filteredResult = responseCall.data.filter(
        (elm) => elm.symbol == el.ticker
      );
      rowObject.wallet_id = el.wallet_id;
      rowObject.holding_id = el.id;
      rowObject.ticker = el.ticker;
      rowObject.longName = filteredResult[0].longName;
      rowObject.price = filteredResult[0].price;
      rowObject.quantity = el.quantity;
      responseEntity.push(rowObject);
      rowObject = {
        wallet_id: 0,
        holding_id: 0,
        ticker: "",
        longName: "",
        price: 0,
        quantity: 0,
      };
    });
  }
  return responseEntity;
};
