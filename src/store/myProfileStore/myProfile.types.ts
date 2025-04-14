import { User } from '@/types/user';

export interface myProfile {
  myProfile: User | null;
  setMyProfile: (me: User | null) => void;
}
