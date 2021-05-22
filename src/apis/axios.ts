import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const url = process.env.REACT_APP_API;

const config: AxiosRequestConfig = {
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  responseType: 'json',
};

const axios: AxiosInstance = Axios.create(config);

axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error.response)
);

export default axios;
