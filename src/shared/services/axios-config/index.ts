import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { environment } from '../../environment';
import { resposeInterceptor, errorInterceptor, requestInterceptor } from './interceptors';
import https from 'https';

const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: environment.URL_BASE,
    responseType: 'json',
    responseEncoding: 'utf8',
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },
  });

  api.interceptors.request.use(
    (config) => {
      // Aplique o requestInterceptor aos cabeçalhos da solicitação
      const requestHeaders: AxiosRequestHeaders = {
        'Content-Type': 'application/json',
        'crossdomain': 'true',
      };

      if (config.url && config.url.startsWith('https://')) {
        config.httpsAgent = new https.Agent({ rejectUnauthorized: false });
      }

      config.headers = requestInterceptor(requestHeaders);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => resposeInterceptor(response),
    (error) => errorInterceptor(error)
  );

  return api;
};

export default createApiInstance;