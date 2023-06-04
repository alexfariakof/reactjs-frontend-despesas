import {AxiosError}  from 'axios';

export const errorInterceptor = (error: AxiosError) => {
    if (error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conecção'));
    }

    if (error.response?.status === 400){
        var data:any;
        data = error.response.data; 
        alert(data.message);
    }


    if (error.response?.status === 401){
        // Do something
    }

    return Promise.reject(error);


};