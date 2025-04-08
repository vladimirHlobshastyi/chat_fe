import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getMessages, markMessagesAsRead } from './requests';
import { Message } from '@/types/messages';

export const useMessagesInfiniteQuery = (chatId: string, wsOffset = 0) => {
  return useInfiniteQuery<Message[], Error>({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam = 0 }) => {
      return getMessages({
        chatId,
        offset: wsOffset + (pageParam as number),
        limit: 25,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 25) return undefined;
      return allPages.flat().length;
    },
    initialPageParam: 0,
    enabled: !!chatId,
  });
};

export const useMarkMessagesAsReadMutation = () => {
  return useMutation({
    mutationFn: (chatId: string) => markMessagesAsRead(chatId),
    onSuccess: () => {
      console.log('Marked message as read successfully');
    },
  });
};
