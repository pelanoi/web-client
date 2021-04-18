import axios from "axios";
import config from "../config";

const configDefaults = {
  baseURL: config.weatherAPI,
};

export function request(url, options) {
  const requestOptions = {
    ...configDefaults,
    ...options,
  };

  return axios.request(url, requestOptions).then(function (response) {
    return response.data;
  });
}

export function get(url, options) {
  const requestOptions = {
    method: "GET",
    ...options,
  };

  return request(url, requestOptions);
}
