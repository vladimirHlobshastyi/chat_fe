import axiosClient from '../axiosClient';
import { GetMessageQueryType } from './types';

export const getMessages = async ({
  chatId,
  before,
  limit = 25,
}: GetMessageQueryType['Params']) => {
  const response = await axiosClient.get<GetMessageQueryType['Data']>(
    `/messages/${chatId}`,
    {
      params: { before, limit },
    },
  );

  return response.data;
};
