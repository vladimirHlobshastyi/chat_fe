interface MyProfileData {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type GetMyProfileQueryType = {
  Params: unknown;
  Data: { data: MyProfileData };
};
