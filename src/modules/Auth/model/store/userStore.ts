import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
   userId: number | null;
   workspaceId: number | null;
   setUserId: (id: number | null) => void;
   setWorkspaceId: (id: number | null) => void;
   clearUserId: () => void;
   clearWorkspaceId: () => void;
}

export const useUserStore = create(
   persist<UserState>(
      (set) => ({
         userId: null,
         workspaceId: null,
         setUserId: (id) => set({ userId: id }),
         setWorkspaceId: (id) => set({ workspaceId: id }),
         clearUserId: () => set({ userId: null }),
         clearWorkspaceId: () => set({ workspaceId: null }),
      }),
      {
         name: 'user-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
