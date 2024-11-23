import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import { AxiosError } from 'axios';

interface CreateWorkspaceData {
   name: string;
   created_by: number;
}

interface Workspace {
   workspace_name: string;
   owner_id: number;
}

const createWorkspace = async (workspaceData: CreateWorkspaceData): Promise<Workspace> => {
   const response = await api.post<Workspace>('/workspaces/', workspaceData);
   return response.data;
};

export const useCreateWorkspace = () => {
   return useMutation<Workspace, AxiosError, CreateWorkspaceData>({
      mutationFn: createWorkspace,
      onSuccess: (newWorkspace) => {
         console.log('Воркспейс успешно создан:', newWorkspace);
      },
      onError: (error) => {
         console.error('Ошибка при создании воркспейса:', error.message);
      },
   });
};
