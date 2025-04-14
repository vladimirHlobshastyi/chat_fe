import { create } from 'zustand';
import { UsersStore } from './usersStore.types';

export const useUsersStore = create<UsersStore>((set) => ({
  onlineUsers: new Set(),
  setOnlineUsers: (ids) => set({ onlineUsers: new Set(ids) }),
}));
