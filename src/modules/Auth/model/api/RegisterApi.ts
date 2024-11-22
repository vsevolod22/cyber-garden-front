import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IAuthResponse } from './types';
import { AxiosError } from 'axios';
import { api } from '@/shared/api/axios-instance';

interface RegisterCredentials {
   email: string;
   password: string;
   username: string;
}

const register = async (credentials: RegisterCredentials): Promise<IAuthResponse> => {
   const response = await api.post<IAuthResponse>('/auth/register', {
      ...credentials,
   });
   if (response.status >= 400) {
      throw new Error('Ошибка регистрации');
   }
   localStorage.setItem('token', response.data.access_token); // Сохраняем токен
   return response.data;
};

// Хук для выполнения мутации регистрации
export const useRegister = () => {
   return useMutation<IAuthResponse, AxiosError, RegisterCredentials>({
      mutationFn: register, // Передаем функцию регистрации
      onSuccess: (data) => {
         console.log('Успешная регистрация', data);
         // Вы можете вызвать обновление данных пользователя или другие действия
      },
      onError: (error) => {
         console.error('Ошибка при регистрации:', error.message);
      },
   });
};
