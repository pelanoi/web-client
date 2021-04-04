import axios from 'axios';

const config = {
  baseURL: 'http://localhost:3000',
};

export const http = axios.create(config);
