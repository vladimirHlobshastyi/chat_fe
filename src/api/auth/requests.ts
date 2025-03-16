import axiosClient from '../axiosClient';
import { LoginQueryType, LogoutQueryType } from './types';

export const login = async (params: LoginQueryType['Params']) => {
  const response = await axiosClient.post<LoginQueryType['Data']>(
    '/auth/login',
    params,
  );
  return response.data;
};

export const logOut = async () => {
  const response =
    await axiosClient.post<LogoutQueryType['Data']>('/auth/logout');
  return response.data;
};
