import  axios from 'axios';
import { environment } from '../../environment';
import { responseInteceptor, errorInteceptor } from './interceptors';


const Api = axios.create({
    baseURL: environment.URL_BASE,
    withCredentials: false,
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
    'Content-Type': 'application/json',
    'Accept':'*/*',
    'Connection':'keep-alive'
  },
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    }
 });

 Api.interceptors.request.use(config => {  
  console.log('Request was sent');
  return config;
});

 
Api.interceptors.response.use(
  
  (response)  => responseInteceptor(response),
  (error)  => errorInteceptor(error)
);

export { Api };