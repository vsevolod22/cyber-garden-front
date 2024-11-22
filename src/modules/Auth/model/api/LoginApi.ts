import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

import type { IAuthResponse } from './types';
import { api } from '@/shared/api/axios-instance';

interface LoginCredentials {
   email: string;
   password: string;
}

const login = async (credentials: LoginCredentials): Promise<IAuthResponse> => {
   const response = await api.post<IAuthResponse>(
      `/auth/login`, // URL

      {
         params: {
            email: credentials.email, // email в строке запроса
            password: credentials.password, // password в строке запроса
         },
         headers: {
            Accept: 'application/json', // Указываем ожидаемый формат ответа
         },
      },
   );

   if (response.status >= 400) {
      throw new Error('Ошибка авторизации');
   }

   localStorage.setItem('token', response.data.access_token); // Сохраняем токен
   return response.data;
};

export const useLogin = () => {
   return useMutation<IAuthResponse, AxiosError, LoginCredentials>({
      mutationFn: login,
      onSuccess: (data) => {
         console.log('Успешный вход в систему', data);
      },
      onError: (error) => {
         console.error('Ошибка при входе в систему:', error);
      },
   });
};
