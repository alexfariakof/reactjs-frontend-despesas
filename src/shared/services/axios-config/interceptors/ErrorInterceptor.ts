import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
    //var data:any;

    if (error.response?.status === 400) {
        throw error;
    } else if (error.response?.status === 401) {
        localStorage.clear();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        console.log(error);
    } else if (error.message === 'Network Error') {
        localStorage.clear();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        console.log('Erro de conexão!');
    }
    return Promise.reject(error);
};