import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add a request interceptor to attach the token
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const useGet = async (url: string, additionalHeaders: Record<string, string> = {}) => {
  const config: AxiosRequestConfig = {
    headers: {
      ...additionalHeaders,
    },
  };
  return apiClient.get(url, config);
};

export const usePost = async (url: string, data: any, additionalHeaders: Record<string, string> = {}) => {
  const config: AxiosRequestConfig = {
    headers: {
      ...additionalHeaders,
    },
  };
  return apiClient.post(url, data, config);
};

export const usePut = async (url: string, data: any, additionalHeaders: Record<string, string> = {}) => {
  const config: AxiosRequestConfig = {
    headers: {
      ...additionalHeaders,
    },
  };
  return apiClient.put(url, data, config);
};

export const useDelete = async (url: string, additionalHeaders: Record<string, string> = {}) => {
  const config: AxiosRequestConfig = {
    headers: {
      ...additionalHeaders,
    },
  };
  return apiClient.delete(url, config);
};
