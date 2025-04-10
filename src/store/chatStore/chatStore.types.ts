import { User } from '@/types/user';

export type ChatStore = {
  onlineUsers: Set<string>;
  myProfile: User | null;
  setMyProfile: (me: User | null) => void;
  setOnlineUsers: (ids: string[]) => void; //TODO will move come selectors to the new store
};
