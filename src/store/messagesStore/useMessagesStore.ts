import { create } from 'zustand';
import { MessagesStore } from './messagesStore.types';

export const useMessagesStore = create<MessagesStore>((set) => ({
  messages: [],
  setMessages: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessagesRead: () =>
    set((state) => {
      const newState = state.messages.map((message) => {
        return { ...message, is_read: true };
      });
      return {
        messages: newState,
      };
    }),
}));
