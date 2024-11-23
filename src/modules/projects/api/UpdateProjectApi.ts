import { useMutation } from '@tanstack/react-query';
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

interface UpdateProjectData {
   name?: string;
}

const patchProject = async (id: number, data: UpdateProjectData): Promise<Project> => {
   const response = await api.patch<Project>(`/projects/${id}`, data, {
      headers: {
         Accept: 'application/json',
      },
   });
   return response.data;
};

export const useUpdateProject = () => {
   const updateProjectInStore = useProjectStore((state) => state.updateProject);

   const mutation = useMutation<Project, AxiosError, { id: number; data: UpdateProjectData }>({
      mutationFn: ({ id, data }) => patchProject(id, data),
      onSuccess: (updatedProject) => {
         updateProjectInStore(updatedProject);
      },
      onError: (error) => {
         console.error('Ошибка при обновлении проекта:', error.message);
      },
   });

   return mutation;
};
