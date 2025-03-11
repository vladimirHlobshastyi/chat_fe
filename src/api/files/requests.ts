import axiosClient from '../axiosClient';
import { UploadFileQueryType } from './types';

export const uploadFile = async (params: UploadFileQueryType['Params']) => {
  const response = await axiosClient.post<UploadFileQueryType['Data']>(
    '/files/upload',
    params,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return response.data;
};
