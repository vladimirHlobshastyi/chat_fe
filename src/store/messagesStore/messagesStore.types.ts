import { Message } from '@/types/messages';

export type MessagesStore = {
  messages: Message[];
  setClearMessages: () => void;
  setMessages: (message: Message) => void;
  setMessagesRead: () => void;
};
