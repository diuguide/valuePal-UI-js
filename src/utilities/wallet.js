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

export const getAvgPrice = (token, ticker) => {
  
  let headers = {
    Authorization: token,
  };

  authClient
    .post("/stock/avgPrice", ticker, { headers })
    .then((res) => {
      console.log("response: ", res);
      return res.data;
    })
    .catch((err) => console.log("THIS ERROR: ", err));
};

export const addAvgPrice = (token, resArray) => {
  let newArray = [];
  resArray.forEach((each) => {
    console.log("getAvgPrice: ", getAvgPrice(token, each.ticker));
    // getAvgPrice(token, each.ticker).then((res) => {
    //   console.log("res inside function: ", res);
    //   each = { ...each, avgPrice: res };
    //   console.log("each elemeng: ", each);
    //   newArray.push(each);
    // });
  });

  return newArray;
};

export const createHoldingRow = (response, responseCall) => {
  let token = response.config.headers.Authorization;
  let rowObject = {
    wallet_id: 0,
    holding_id: 0,
    ticker: "",
    longName: "",
    price: 0,
    quantity: 0,
    avgPrice: 0,
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
        avgPrice: 0,
      };
    });
  }
  
  return responseEntity;
};