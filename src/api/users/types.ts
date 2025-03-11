import { QueriesParams } from '@/types/queries';
import { Pagination } from '@/types/common';
import { User } from '@/types/user';

export type GetUsersQueryType = {
  Params: QueriesParams;
  Data: { data: User[]; pagination: Pagination };
};

export interface CreateUserParams {
  role: string;
  clickId?: string;
  name: string;
  geo: string;
  about?: string;
  isBanned?: boolean;
  //isVerified
  avatar?: string;
  email: string;
  password: string;
}

export type CreateUserQueryType = {
  Params: Partial<CreateUserParams>;
  Data: User;
};

export interface UpdateUserParams {
  role: string;
  clickId: string;
  name: string;
  geo: string;
  about: string;
  isBanned: boolean;
  avatar: string;
  //isVerified
}

export type UpdateUserQueryType = {
  Params: {
    id: string;
    data: Partial<UpdateUserParams>;
  };
  Data: User;
};

export type DeleteUserQueryType = {
  Params: string;
  Data: void;
};
