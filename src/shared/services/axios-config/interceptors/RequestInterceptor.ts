import { AxiosRequestConfig } from "axios";

export const requestInterceptor = (config: AxiosRequestConfig) => {

    const accessToken = localStorage.getItem('@dpApiAccess')?.replaceAll('"', '');

    if (accessToken) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return config;
};