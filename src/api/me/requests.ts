import axiosClient from '../axiosClient';
import { GetMyProfileQueryType } from './types';

export const getMyProfile = async () => {
  try {
    const response =
      await axiosClient.get<GetMyProfileQueryType['Data']>('/me');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
