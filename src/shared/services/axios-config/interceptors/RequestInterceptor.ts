import { AxiosRequestConfig } from "axios";
import { TokenStorageService }  from "../../token-storage/token.storage.service"; 
import dayjs from "dayjs";

export const requestInterceptor = async (config: AxiosRequestConfig) => {
    const tokenStorageService =  new TokenStorageService(); 
    let accessToken = tokenStorageService.getToken();

    if (accessToken) {
        const expiration = dayjs(tokenStorageService.getUser().expiration);
        const dataAtual = dayjs();
        if (expiration < dataAtual) {
            await tokenStorageService.refreshToken();
            accessToken = tokenStorageService.getToken();
        }    

        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return config;
};