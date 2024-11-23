import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import type { AxiosError } from 'axios';

interface IUser {
   name: string;
   email: string;
   id: number;
   created_at: string;
   updated_at: string;
}

const fetchUser = async (): Promise<IUser> => {
   const response = await api.get<IUser>('/auth/me');
   return response.data;
};

export const useFetchUser = () => {
   return useQuery<IUser, AxiosError>({
      queryKey: ['user'],
      queryFn: fetchUser,
   });
};
