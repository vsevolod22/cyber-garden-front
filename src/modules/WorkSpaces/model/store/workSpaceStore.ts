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
   setWorkspaces: (workspaces: Workspace[]) => void;
   addWorkspace: (workspace: Workspace) => void;
   removeWorkspace: (id: number) => void;
   clearWorkspaces: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
   persist(
      (set) => ({
         workspaces: [],
         setWorkspaces: (workspaces) => set({ workspaces }),
         addWorkspace: (workspace) =>
            set((state) => ({
               workspaces: [...state.workspaces, workspace],
            })),
         removeWorkspace: (id) =>
            set((state) => ({
               workspaces: state.workspaces.filter((ws) => ws.id !== id),
            })),
         clearWorkspaces: () => set({ workspaces: [] }),
      }),
      {
         name: 'workspace-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
