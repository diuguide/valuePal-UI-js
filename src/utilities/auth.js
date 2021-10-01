import axios from "axios";

//Client connection
export const authClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (user) => {
  let response = await authClient.post("/users/add", user);
  return response;
};

export const loginUser = async (user) => {
  let response = await authClient.post("/users/login", user);
  return response;
};
