import {AxiosRequestHeaders}  from 'axios';

export const requestInteceptor = (requestHeader: AxiosRequestHeaders) => {
    requestHeader = {        
            'Content-Type': 'application/json',
            'crossdomain': 'true'        
    }
    return requestHeader;
};