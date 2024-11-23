import { refreshTokenRequest } from '@/modules/Auth/model/api/refreshTokenRequest';
import { useTokenStore } from '@/modules/Auth/model/store/authStore';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosRequestConfig } from 'axios';
import * as decode from 'jwt-decode'; // Импортируем как модуль

const api: AxiosInstance = axios.create({
   baseURL: 'https://cybergarden.leganyst.ru',
   withCredentials: true,
   headers: {
      Accept: 'application/json', // Указываем ожидаемый формат ответа
   },
});

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
   const { accessToken } = useTokenStore.getState(); // Get accessToken from the token store

   console.log('Токен в onRequest:', accessToken);

   if (accessToken && !config.url?.includes('auth')) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
   }

   return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => response;
const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onResponseError);

export { api };
