import { Chat } from '@/api/chats/types';

export interface DialogItemProps {
  chat: Chat;
  role: 'admin' | 'user';
} //TODO will improve
