export type LoginQueryType = {
  Params: {
    email: string;
    password: string;
  };
  Data: { message: string };
};

export type LogoutQueryType = {
  Params: unknown;
  Data: { message: string };
};
