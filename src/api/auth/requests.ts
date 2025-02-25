import axiosClient from '../axiosClient';
import { LoginQueryType } from './types';

export const login = async (params: LoginQueryType['Params']) => {
  const response = await axiosClient.post<LoginQueryType['Data']>(
    '/auth/login',
    params,
  );
  return response.data;
};
