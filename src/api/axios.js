import axios from "axios";
import store from "./../store.js";
axios.defaults.baseURL = "http://127.0.0.1:7001";
console.log(store);
// axios.defaults.headers.common["Authorization"] = store.token;
axios.defaults.timeout = 5000;
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.common["Authorization"] = "beakre " + store.state.token;
    }
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
