// utils/axiosInstance.ts
import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get the token from cookies
        const token = Cookies.get('token');

        // Check if the request is for sign-in or sign-up
        const isAuthEndpoint = config.url === '/auth/signin' || config.url === '/auth/signup';

        // If the token exists, set it in the Authorization header
        if (token && !isAuthEndpoint) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle specific status codes
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/signin";
                console.error('Unauthorized access - redirecting to login');
            }
        }
        // Handle other errors
        return Promise.reject(error);
    }
);

export default axiosInstance;
