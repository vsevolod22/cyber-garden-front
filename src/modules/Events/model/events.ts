import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Events } from './types';
import { api } from '@/shared/api/axios-instance';

const events = async (): Promise<Events> => {
   const response = await api.get<Events>('/events/event/', {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
   });
   if (response.status >= 400) {
      throw new Error('Ошибка запроса данных');
   }
   // Сохраняем токен
   return response.data;
};

export const useFetchEventsList = (): UseQueryResult<Events, Error> => {
   return useQuery<Events, Error>({
      queryKey: ['events'],
      queryFn: events,
      placeholderData: (previousData) => previousData,
   });
};
