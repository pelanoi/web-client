import axios from 'axios';
import config from '../config';

const requestConfig = {
  baseURL: config.weatherAPI,
};

export const http = axios.create(requestConfig);
