import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import type { AxiosError } from 'axios';

// Функция удаления проекта
const deleteProject = async (projectId: number): Promise<void> => {
   await api.delete(`/projects/${projectId}`);
};

// Хук для удаления проекта
export const useDeleteProject = () => {
   const queryClient = useQueryClient();

   return useMutation<void, AxiosError, number>({
      mutationFn: deleteProject,
      onSuccess: (_, projectId) => {
         console.log(`Проект с ID ${projectId} успешно удалён.`);
         // Инвалидируем кэш для обновления списка проектов
         queryClient.invalidateQueries({ queryKey: ['projects'] });
      },
      onError: (error) => {
         console.error('Ошибка при удалении проекта:', error.message);
      },
   });
};
