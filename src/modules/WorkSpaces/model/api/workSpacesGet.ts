import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import type { AxiosError } from 'axios';
import { useWorkspaceStore } from '../store/workSpaceStore';

interface IWorkspace {
   name: string;
   id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

const fetchWorkspaces = async (): Promise<IWorkspace[]> => {
   const response = await api.get<IWorkspace[]>('/workspaces/');
   return response.data;
};

export const useFetchWorkspaces = () => {
   const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);

   const queryResult = useQuery<IWorkspace[], AxiosError>({
      queryKey: ['workspaces'],
      queryFn: fetchWorkspaces,
   });

   const { data, error, isSuccess, isError } = queryResult;

   useEffect(() => {
      if (isSuccess && data) {
         setWorkspaces(data);
      }
   }, [isSuccess, data, setWorkspaces]);

   useEffect(() => {
      if (isError && error) {
         console.error('Ошибка при загрузке рабочих пространств:', error.message);
      }
   }, [isError, error]);

   return queryResult;
};
