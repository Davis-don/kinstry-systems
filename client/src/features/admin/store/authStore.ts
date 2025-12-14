import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthTokens {
  refresh: string;
  access: string;
}

interface AuthState {
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      tokens: null,
      isAuthenticated: false,

      login: (tokens: AuthTokens) => {
        set({ tokens, isAuthenticated: true });
      },

      logout: () => {
        set({ tokens: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // This automatically saves to localStorage
    }
  )
);