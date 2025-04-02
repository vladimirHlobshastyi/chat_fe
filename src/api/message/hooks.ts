import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from './requests';
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
