import { User } from '@/types/user';
import { create } from 'zustand';

interface myProfile {
  myProfile: User | null;
  setMyProfile: (me: User | null) => void;
}

export const useMyProfileStore = create<myProfile>((set) => ({
  myProfile: null,
  setMyProfile: (me) => set({ myProfile: me }),
}));
