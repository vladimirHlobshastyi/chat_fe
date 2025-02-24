export interface User {
  id: string;
  clickId?: string;
  role: 'user' | 'admin';
  name: string;
  geo?: string;
  about?: string;
  isVerified: boolean;
  telegramId: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  avatarId?: string;
}

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
