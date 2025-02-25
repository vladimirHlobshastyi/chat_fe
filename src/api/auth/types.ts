export type LoginQueryType = {
  Params: {
    email: string;
    password: string;
  };
  Data: {
    data: {
      session: {
        access_token: string;
        refresh_token: string;
      };
    };
  };
};
