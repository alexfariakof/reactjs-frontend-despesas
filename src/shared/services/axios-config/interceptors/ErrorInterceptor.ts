import {AxiosError}  from 'axios';

export const errorInterceptor = (error: AxiosError) => {
    var data:any;
    
    if (error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conecção'));
    }

    if (error.response?.status === 400){        
        data = error.response.data; 
        console.log(data.message);
    }

    if (error.response?.status ===  404){
        data = error.response.data; 
        console.log(data.message);
    }


    if (error.response?.status ===  401){
        data = error.response.data; 
        console.log(data.message);
    }

    if (error.response?.status ===  415){
        data = error.response.data; 
        console.log(data.message);
    }  

    return Promise.reject(error);
};