import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './authStore';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    { name: 'auth-storage' },
  ),
);
