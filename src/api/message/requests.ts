import axiosClient from '../axiosClient';
import { GetMessageQueryType } from './types';

export const getMessages = async (chatId: GetMessageQueryType['Params']) => {
  const response = await axiosClient.get(`/messages/${chatId}`);
  return response.data;
};

export const sendMessage = async ({
  chatId,
  recipientId,
  text,
}: {
  chatId: string;
  recipientId: string;
  text: string;
}) => {
  const response = await axiosClient.post('/messages', {
    chatId,
    recipientId,
    text,
  });
  return response.data;
};
