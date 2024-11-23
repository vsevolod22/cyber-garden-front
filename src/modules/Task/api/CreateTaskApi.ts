import { useMutation } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';
import { AxiosError } from 'axios';
import { useTaskStore } from '@/modules/Task/model/store/TaskStore';

interface CreateTaskData {
   name: string;
   due_date: string;
   priority: string;
   project_id: number;
   assigned_to: number;
   reminder_time: string;
   created_by: number;
}

interface Task {
   name: string;
   due_date: string;
   description: string;
   status: string;
   priority: string;
   id: number;
   project_id: number;
   created_by: number;
   assigned_to: number | null;
   is_completed: boolean;
   created_at: string;
   updated_at: string;
}

const createTask = async (taskData: CreateTaskData): Promise<Task> => {
   const response = await api.post<Task>('/tasks/', taskData, {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   });
   return response.data;
};

export const useCreateTask = () => {
   const addTask = useTaskStore((state) => state.addTask);

   return useMutation<Task, AxiosError, CreateTaskData>({
      mutationFn: createTask,
      onSuccess: (newTask) => {
         console.log('Задача успешно создана:', newTask);
         addTask(newTask); // Добавляем задачу в Zustand
      },
      onError: (error) => {
         console.error('Ошибка при создании задачи:', error.message);
      },
   });
};
