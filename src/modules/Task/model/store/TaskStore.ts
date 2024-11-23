import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Task {
   id: number;
   name: string;
   due_date: string;
   priority: string;
   description: string;
   status: string;
   project_id: number;
   created_by: number;
   assigned_to: number | null;
   is_completed: boolean;
   created_at: string;
   updated_at: string;
}

interface TaskState {
   tasks: Task[]; // Список задач
   taskStates: Record<number, boolean>; // Состояния задач (например, чекбоксы)
   setTasks: (tasks: Task[]) => void; // Установка всех задач
   addTask: (task: Task) => void; // Добавление задачи
   updateTask: (updatedTask: Task) => void; // Обновление задачи
   toggleTaskCompletion: (id: number) => void; // Переключение состояния задачи
   removeTask: (id: number) => void; // Удаление задачи
   setTaskChecked: (id: number, isChecked: boolean) => void; // Установка состояния задачи
   getTaskById: (id: number) => Task | undefined; // Получение задачи по ID
   clearTasks: () => void; // Очистка всех задач
}

export const useTaskStore = create<TaskState>()(
   persist(
      (set, get) => ({
         tasks: [],
         taskStates: {},

         // Установить список задач
         setTasks: (tasks) => set({ tasks }),

         // Добавить новую задачу
         addTask: (task) =>
            set((state) => ({
               tasks: [...state.tasks, task],
            })),

         // Обновить существующую задачу
         updateTask: (updatedTask) =>
            set((state) => ({
               tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
            })),

         // Переключить состояние выполнения задачи
         toggleTaskCompletion: (id) =>
            set((state) => ({
               tasks: state.tasks.map((task) => (task.id === id ? { ...task, is_completed: !task.is_completed } : task)),
            })),

         // Удалить задачу
         removeTask: (id) =>
            set((state) => ({
               tasks: state.tasks.filter((task) => task.id !== id),
            })),

         // Установить состояние задачи (например, чекбокса)
         setTaskChecked: (id, isChecked) =>
            set((state) => ({
               taskStates: { ...state.taskStates, [id]: isChecked },
            })),

         // Получить задачу по ID
         getTaskById: (id) => get().tasks.find((task) => task.id === id),

         // Очистить все задачи и их состояния
         clearTasks: () => set({ tasks: [], taskStates: {} }),
      }),
      {
         name: 'task-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
