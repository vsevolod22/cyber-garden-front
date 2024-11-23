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
   // Извлекаем токены напрямую из localStorage
   const accessToken = localStorage.getItem('token-storage')
      ? JSON.parse(localStorage.getItem('token-storage') || '{}').accessToken
      : null;

   if (accessToken && !config.url?.includes('auth')) {
      const decodedToken: { exp: number } = decode.jwtDecode(accessToken);

      const currentDate = new Date();
      if (decodedToken.exp * 1000 - 518000 < currentDate.getTime()) {
         const newToken = await refreshTokenRequest();
         if (newToken) {
            // Сохраняем новый токен в localStorage для последующего использования
            const storedTokens = JSON.parse(localStorage.getItem('token-storage') || '{}');
            localStorage.setItem(
               'token-storage',
               JSON.stringify({
                  ...storedTokens,
                  accessToken: newToken,
               }),
            );

            config.headers.set('Authorization', `Bearer ${newToken}`);
         }
      } else {
         config.headers.set('Authorization', `Bearer ${accessToken}`);
      }
   }
   return config;
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI10NDRAZ21haWwuY29tIiwicm9sZXMiOlt7ImlkIjoxLCJjcmVhdGVkRGF0ZSI6IjIwMjQtMDktMjRUMDk6NDM6MjkuNjgxWiIsIm5hbWUiOiJVc2VyIn1dLCJpYXQiOjE3Mjk4ODQ0MjQsImV4cCI6MTcyOTg4NTMyNH0.1tMXoKa7h-NIuS9iTWXjOeP51t6608o72FYE3cEiWkE
const onResponse = (response: AxiosResponse): AxiosResponse => response;
const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

api.interceptors.request.use(onRequest);
api.interceptors.response.use(onResponse, onResponseError);

export { api };
