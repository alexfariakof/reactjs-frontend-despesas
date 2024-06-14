import { AxiosError } from 'axios';
import { TokenStorageService } from '../../token-storage/token.storage.service';

export const errorInterceptor = (error: AxiosError) => {
    const tokenStorageService =  new TokenStorageService(); 
        
    if (error.response?.status === 400) {
        //throw error;
        console.log('Falha na requisição!');
    } else if (error.response?.status === 401) {
        const auth = tokenStorageService.getRefreshToken();
        if (auth !== null && auth !== undefined)
            tokenStorageService.refreshToken();
        else {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        }
    } else if (error.message === 'Network Error') {
        sessionStorage.clear();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        console.log('Erro de conexão!');
    }
    return Promise.reject(error);    
};
