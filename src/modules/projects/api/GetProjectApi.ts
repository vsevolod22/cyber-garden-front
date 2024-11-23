import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import type { AxiosError } from 'axios';
import { useProjectStore } from '../model/useProjectStore';

interface Project {
   name: string;
   id: number;
   workspace_id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

const fetchProjects = async (): Promise<Project[]> => {
   const response = await api.get<Project[]>('/projects');
   return response.data;
};

export const useFetchProjects = () => {
   const setProjects = useProjectStore((state) => state.setProjects);

   const queryResult = useQuery<Project[], AxiosError>({
      queryKey: ['projects'],
      queryFn: fetchProjects,
   });

   const { data, error, isSuccess, isError } = queryResult;

   useEffect(() => {
      if (isSuccess && data) {
         setProjects(data);
      }
   }, [isSuccess, data, setProjects]);

   useEffect(() => {
      if (isError && error) {
         console.error('Ошибка при получении проектов:', error.message);
      }
   }, [isError, error]);

   return queryResult;
};
