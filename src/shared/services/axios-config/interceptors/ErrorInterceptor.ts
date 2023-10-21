import {AxiosError}  from 'axios';

export const errorInterceptor = (error: AxiosError) => {    
    var data:any;
    
    if (error.response?.status === 400){        
        data = error.response.data; 
        console.log(data.message);
    } else  if (error.response?.status ===  401){
        localStorage.clear();
        data = error.response.data; 
        console.log(data.message);
    } else if (error.response?.status ===  415){
        data = error.response.data; 
        console.log(data.message);
    } else if (error.message === 'Network Error'){
        console.log('Erro de conexão!');
        localStorage.clear();
    }
    return Promise.reject(error);
};