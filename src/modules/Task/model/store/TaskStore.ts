import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Task {
   id: string;
   project_id: number;
   name: string;
   description: string;
   status: string;
   created_at: string;
   updated_at: string;
}

interface TaskState {
   tasks: Task[];
   taskStates: Record<string, boolean>;
   setTasks: (tasks: Task[]) => void;
   setTaskChecked: (id: string, isChecked: boolean) => void;
   clearTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
   persist(
      (set) => ({
         tasks: [],
         taskStates: {},

         setTasks: (tasks) => set({ tasks }),

         setTaskChecked: (id, isChecked) =>
            set((state) => ({
               taskStates: { ...state.taskStates, [id]: isChecked },
            })),

         clearTasks: () => set({ tasks: [], taskStates: {} }),
      }),
      {
         name: 'task-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
