import {AxiosRequestHeaders}  from 'axios';

export const requestInterceptor = (requestHeader: AxiosRequestHeaders) => {
    requestHeader = {        
            'Content-Type': 'application/json',
            'crossdomain': 'true'        
    }
    return requestHeader;
};