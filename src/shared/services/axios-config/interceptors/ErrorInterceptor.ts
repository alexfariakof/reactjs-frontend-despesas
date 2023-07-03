import {AxiosError}  from 'axios';

export const errorInterceptor = (error: AxiosError) => {    

    var data:any;
    
    if (data === undefined)
    {
        localStorage.clear();
    }

    if (error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conecção'));
    }

    if (error.response?.status === 400){        
        data = error.response.data; 
        alert(data.message);
    }

    if (error.response?.status ===  401){
        data = error.response.data; 
        alert(data.message);
    }

    if (error.response?.status ===  415){
        data = error.response.data; 
        alert(data.message);
    }  

    return Promise.reject(error);
};