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

export const getTotalUnreadCount = async () => {
  const { data } = await axiosClient.get<{ total: number }>(
    '/messages/unread-count/total',
  );
  return data.total;
};

export const getUnreadByChat = async () => {
  const { data } = await axiosClient.get<Record<string, number>>(
    '/messages/unread-count/by-chat',
  );
  return data;
};
