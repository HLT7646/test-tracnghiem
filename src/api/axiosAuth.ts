
import Cookies from "js-cookie";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
const token = Cookies.get("token");
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com/auth',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
const refreshToken = async () => {
  try {
    const response = await axiosInstance.post
      (
        `/auth/refresh`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
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
