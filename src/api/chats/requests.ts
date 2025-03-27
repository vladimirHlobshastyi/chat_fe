import axiosClient from '../axiosClient';
import {
  AddChatQueryType,
  GetChatQueryType,
  GetSingleChatQueryType,
} from './types';

export const getChats = async (search: GetChatQueryType['Params']) => {
  const response = await axiosClient.get<GetChatQueryType['Data']>('/chat', {
    params: search,
  });
  return response.data;
};

export const createChat = async ({
  senderId,
  recipientId,
}: AddChatQueryType['Params']) => {
  const response = await axiosClient.post('/chat', { senderId, recipientId });
  return response.data;
};

export const getChatById = async (chatId: GetSingleChatQueryType['Params']) => {
  const response = await axiosClient.get<GetSingleChatQueryType['Data']>(
    `/chat/${chatId}`,
  );
  return response.data;
};
