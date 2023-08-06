import Api from "../Api/api";
const setAuthToken = (token) => {
  if (token) {
    return (Api.defaults.headers.common["x-auth-token"] = token);
  }
  return delete Api.defaults.headers.common["x-auth-token"];
};

export default setAuthToken;
