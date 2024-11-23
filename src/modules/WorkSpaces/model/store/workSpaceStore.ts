import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Workspace {
   name: string;
   id: number;
   created_by: number;
   created_at: string;
   updated_at: string;
}

interface WorkspaceState {
   workspaces: Workspace[];
   setWorkspaces: (workspaces: Workspace[]) => void; // Установить список рабочих пространств
   addWorkspace: (workspace: Workspace) => void; // Добавить рабочее пространство
   updateWorkspace: (updatedWorkspace: Workspace) => void; // Обновить рабочее пространство
   removeWorkspace: (id: number) => void; // Удалить рабочее пространство по ID
   clearWorkspaces: () => void; // Очистить список рабочих пространств
   getWorkspaceById: (id: number) => Workspace | undefined; // Получить рабочее пространство по ID
}

export const useWorkspaceStore = create<WorkspaceState>()(
   persist(
      (set, get) => ({
         workspaces: [],

         setWorkspaces: (workspaces) => set({ workspaces }),

         addWorkspace: (workspace) =>
            set((state) => ({
               workspaces: [...state.workspaces, workspace],
            })),

         updateWorkspace: (updatedWorkspace) =>
            set((state) => ({
               workspaces: state.workspaces.map((workspace) =>
                  workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace,
               ),
            })),

         removeWorkspace: (id) =>
            set((state) => ({
               workspaces: state.workspaces.filter((workspace) => workspace.id !== id),
            })),

         clearWorkspaces: () => set({ workspaces: [] }),

         getWorkspaceById: (id) => get().workspaces.find((workspace) => workspace.id === id),
      }),
      {
         name: 'workspace-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
