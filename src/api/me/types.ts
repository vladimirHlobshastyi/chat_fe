import { User } from '@/types/user';

type MyProfileData = User;

export type GetMyProfileQueryType = {
  Params: unknown;
  Data: { data: MyProfileData };
};
