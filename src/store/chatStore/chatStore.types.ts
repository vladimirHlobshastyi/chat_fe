import { User } from '@/types/user';

export type ChatStore = {
  onlineUsers: Set<string>;
  currentChatId: string | null;
  isTypingMap: Record<string, boolean>;
  myProfile: User | null;
  setMyProfile: (me: User | null) => void;
  setOnlineUsers: (ids: string[]) => void;
  setCurrentChatId: (id: string) => void;
  setTyping: (userId: string, isTyping: boolean) => void;
};
