import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { environment } from "../src/shared/environment";
import { resposeInterceptor, errorInterceptor, requestInterceptor } from "../src/shared/services/axios-config/interceptors";
import https from 'https';

const createApiInstance = () : AxiosInstance => {
    const api = axios.create({
        baseURL: environment.URL_BASE,
        responseType: 'json',
        responseEncoding: 'utf8',
        validateStatus: function (status) {
          return status >= 200 && status < 300; // default
        },                    
      });

      api.post = jest.fn();
      api.put = jest.fn();
      api.delete = jest.fn();
      api.get = jest.fn();
    
      api.interceptors.request.use(
        (config) => {
          // Aplique o requestInterceptor aos cabeçalhos da solicitação
          const requestHeaders: AxiosRequestHeaders = {
            'Content-Type': 'application/json',
            'crossdomain': 'false',
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
}
export default createApiInstance;