import { create } from 'zustand';
import { myProfile } from './myProfile.types';

export const useMyProfileStore = create<myProfile>((set) => ({
  myProfile: null,
  setMyProfile: (me) => set({ myProfile: me }),
}));
