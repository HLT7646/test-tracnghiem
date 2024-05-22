import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: { 'Content-Type': 'application/json' },
});
const token = Cookies.get("token");
const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh');
    const { token } = response.data;
    Cookies.set('token', token);
    return token;
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

export const instanceGetRequests = (url: string, params?: any) => axiosInstance.post(url, params);

export const instancePostRequests = (url: string, params: any) => axiosInstance.post(url, params);

export const instanceDeleteRequests = (url: string, params?: any) => axiosInstance.get(url, params);

export const instancePutRequests = (url: string, params: any) => axiosInstance.get(url, params);
