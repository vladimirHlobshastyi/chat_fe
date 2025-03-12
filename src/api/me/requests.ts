import axiosClient from '../axiosClient';
import { GetMyProfileQueryType } from './types';

export const getMyProfile = async () => {
  const response = await axiosClient.get<GetMyProfileQueryType['Data']>('/me');
  return response.data;
};
