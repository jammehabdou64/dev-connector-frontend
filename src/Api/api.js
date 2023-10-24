import axios from "axios";

let Api = axios.create({
  baseURL: "/api",
});

export default Api;
