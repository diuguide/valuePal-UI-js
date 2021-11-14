import { authClient } from "./auth";

export const retrieveWallet = async (token) => {
    let headers = {
        'Authorization':token
    }
    let response = await authClient.get("/stock/retrieve",{headers});
    return response.data;
}