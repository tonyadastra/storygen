import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const backendURL: string = process.env.REACT_APP_BACKEND_URL || "/api/";
const axiosClient = axios.create({
    baseURL: backendURL,
});


const api = {
    async get(URL: string, customHeaders?: any): Promise<any> {
        const headers: any = { ...axiosClient.defaults.headers, ...customHeaders };
        try {
            const response: AxiosResponse = await axiosClient.get(URL, { headers });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return null;
            } else {
                throw error;
            }
        }
    },
    async post(URL: string, payload: any, customHeaders: any = {}): Promise<any> {
        const headers: any = {
            ...axiosClient.defaults.headers,
            ...customHeaders,
            // "Content-Type": "application/json",
        };
        const response: AxiosResponse = await axiosClient.post(URL, payload, { headers });
        return response.data;
    },
    async put(URL: string, payload: any, customHeaders: any = {}): Promise<any> {
        const headers: any = {
            ...axiosClient.defaults.headers,
            ...customHeaders,
            "Content-Type": "application/json",
        };
        const response: AxiosResponse = await axiosClient.put(URL, payload, { headers });
        return response.data;
    },
    async patch(URL: string, payload: any, customHeaders: any = {}): Promise<any> {
        const headers: any = {
            ...axiosClient.defaults.headers,
            ...customHeaders,
            "Content-Type": "application/json",
        };
        const response: AxiosResponse = await axiosClient.patch(URL, payload, { headers });
        return response.data;
    },
};

export default api;