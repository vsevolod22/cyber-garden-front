import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TaskState {
   taskStates: Record<string, boolean>; // Состояние чекбоксов по ID задач
   setTaskChecked: (id: string, isChecked: boolean) => void; // Установка состояния задачи
   clearTasks: () => void; // Очистка всех задач
}

export const useTaskStore = create(
   persist<TaskState>(
      (set) => ({
         taskStates: {},
         setTaskChecked: (id, isChecked) =>
            set((state) => ({
               taskStates: { ...state.taskStates, [id]: isChecked },
            })),
         clearTasks: () => set({ taskStates: {} }),
      }),
      {
         name: 'task-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
