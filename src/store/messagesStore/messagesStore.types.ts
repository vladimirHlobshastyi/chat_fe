import { Message } from '@/types/messages';

export type MessagesStore = {
  messages: Message[];
  setMessages: (message: Message) => void;
};
