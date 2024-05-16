import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: { 'Content-Type': 'application/json' },
});

export const instanceGetRequests = (url: string, params?: any) => instance.post(url, params);

export const instancePostRequests = (url: string, params: any) => instance.post(url, params);

export const instanceDeleteRequests = (url: string, params?: any) => instance.get(url, params);

export const instancePutRequests = (url: string, params: any) => instance.get(url, params);
