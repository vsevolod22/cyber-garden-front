import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import type { AxiosError } from 'axios';
import { useProjectStore } from '../model/useProjectStore';

interface CreateProjectData {
   name: string;
   workspace_id: number;
   created_by: number;
}

interface Project {
   name: string;
   id: number;
   workspace_id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

const createProject = async (projectData: CreateProjectData): Promise<Project> => {
   const response = await api.post<Project>('/projects/', projectData);
   return response.data;
};

export const useCreateProject = () => {
   const addProject = useProjectStore((state) => state.addProject);

   const mutation = useMutation<Project, AxiosError, CreateProjectData>({
      mutationFn: createProject,
      onSuccess: (newProject) => {
         addProject(newProject);
      },
      onError: (error) => {
         console.error('Ошибка при создании проекта:', error.message);
      },
   });

   return mutation;
};
