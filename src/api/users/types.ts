import { User } from '@/types/user';

export type GetUsersQueryType = {
  Params: {
    limit: number;
    offset: number;
  };
  Data: User[];
};

export type CreateUserQueryType = {
  Params: Partial<User>;
  Data: User;
};

export type UpdateUserQueryType = {
  Params: {
    id: string;
    data: Partial<User>;
  };
  Data: User;
};

export type DeleteUserQueryType = {
  Params: string;
  Data: void;
};
