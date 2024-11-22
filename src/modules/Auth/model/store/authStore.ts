import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TokenState {
   token: string | null;
   setToken: (token: string | null) => void;
   clearToken: () => void;
}

export const useTokenStore = create(
   persist<TokenState>(
      (set) => ({
         token: null,
         setToken: (token: string | null) => {
            set({ token });
            token ? localStorage.setItem('token', token) : localStorage.removeItem('token');
         },
         clearToken: () => {
            set({ token: null });
            localStorage.removeItem('token');
         },
      }),
      {
         name: 'token-storage',
         storage: createJSONStorage(() => localStorage),
      },
   ),
);
