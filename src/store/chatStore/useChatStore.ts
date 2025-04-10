import { create } from 'zustand';
import { ChatStore } from './chatStore.types';

export const useChatStore = create<ChatStore>((set) => ({
  onlineUsers: new Set(),
  myProfile: null,
  setMyProfile: (me) => set({ myProfile: me }),
  setOnlineUsers: (ids) => set({ onlineUsers: new Set(ids) }),
}));
