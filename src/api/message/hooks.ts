import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getMessages, markMessagesAsRead } from './requests';
import { Message } from '@/types/messages';

export const useMessagesInfiniteQuery = (chatId: string) => {
  return useInfiniteQuery<Message[], Error>({
    queryKey: ['messages', chatId],
    queryFn: ({ pageParam }) =>
      getMessages({
        chatId,
        before: pageParam as string | undefined,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 25) return undefined;
      const lastMessage = lastPage[lastPage.length - 1];
      return lastMessage?.created_at;
    },
    initialPageParam: undefined,
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
