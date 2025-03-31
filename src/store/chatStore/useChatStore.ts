import { create } from 'zustand';
import { ChatStore } from './chatStore.types';

export const useChatStore = create<ChatStore>((set) => ({
  onlineUsers: new Set(),
  currentChatId: null,
  isTypingMap: {},
  myProfile: null,
  setMyProfile: (me) => set({ myProfile: me }),
  setOnlineUsers: (ids) => set({ onlineUsers: new Set(ids) }),
  setCurrentChatId: (id) => set({ currentChatId: id }),
  setTyping: (userId, isTyping) =>
    set((state) => ({
      isTypingMap: { ...state.isTypingMap, [userId]: isTyping },
    })),
}));
