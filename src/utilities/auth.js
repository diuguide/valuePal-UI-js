import axios from "axios";

const localUrl = "http://localhost:8080/";
const awsUrl =
  "http://testenv-env.eba-xk2s4afv.us-east-1.elasticbeanstalk.com/";

//Client connection
export const authClient = axios.create({
  baseURL: awsUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userData = async (token) => {
  let headers = {
    Authorization: token,
  };
  let response = await authClient.get("/users/getUserInfo", {
    headers,
  });

  return response.data;
};

export const registerUser = async (user) => {
  let response = await authClient.post("/users/add", user);
  return response;
};

export const loginUser = async (user) => {
  let response = await authClient.post("/login", user);
  return response;
};
