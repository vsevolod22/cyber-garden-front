import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskState {
   tasks: Record<string, boolean>; // Состояние чекбоксов по ID задач
   setTaskChecked: (id: string, isChecked: boolean) => void; // Установка состояния задачи
   clearTasks: () => void; // Очистка всех задач
}

export const useTaskStore = create(
   persist<TaskState>(
      (set) => ({
         tasks: {},
         setTaskChecked: (id, isChecked) =>
            set((state) => ({
               tasks: { ...state.tasks, [id]: isChecked },
            })),
         clearTasks: () => set({ tasks: {} }),
      }),
      {
         name: 'task-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
