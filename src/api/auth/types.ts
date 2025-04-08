import { UserRole } from '@/types/user';

export type LoginQueryType = {
  Params: {
    email: string;
    password: string;
  };
  Data: { message: string; role: UserRole };
};

export type LogoutQueryType = {
  Params: unknown;
  Data: { message: string };
};
