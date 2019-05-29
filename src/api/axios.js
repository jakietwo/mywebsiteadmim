import axios from "axios";
import store from "./../store";
axios.defaults.baseURL = "http://127.0.0.1:7001";
axios.defaults.headers.common["Authorization"] = store.state.token;
axios.defaults.timeout = 5000;
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export { axios };
