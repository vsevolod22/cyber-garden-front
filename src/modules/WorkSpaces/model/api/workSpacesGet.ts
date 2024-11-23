import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import { AxiosError } from 'axios';
import { useWorkspaceStore } from '../store/workSpaceStore';

interface IWorkspace {
   name: string;
   id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

export const useFetchWorkspacesAsync = (options?: UseQueryOptions<IWorkspace[], AxiosError>) => {
   const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);

   const fetchWorkspaces = async (): Promise<IWorkspace[]> => {
      const response = await api.get<IWorkspace[]>('/workspaces/');
      setWorkspaces(response.data);
      return response.data;
   };

   return useQuery<IWorkspace[], AxiosError>({
      queryKey: ['workspaces'],
      queryFn: fetchWorkspaces,
      enabled: false,
      ...options,
   });
};
