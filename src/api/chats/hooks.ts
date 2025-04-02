import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getChats, createChat, getChatById } from '@/api/chats/requests';
import { GetChatQueryType } from './types';

export const useChatsQuery = (search: GetChatQueryType['Params']) => {
  return useQuery({
    queryKey: ['chats', search],
    queryFn: () => getChats(search),
    placeholderData: (prev) => prev,
    staleTime: 60_000, //TODO will wix it
    refetchInterval: 60_000,
  });
};

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
  });
};

export const useChatByIdQuery = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChatById(chatId),
    enabled: !!chatId,
    staleTime: 60_000, //TODO will wix it
    refetchInterval: 60_000,
  });
};
