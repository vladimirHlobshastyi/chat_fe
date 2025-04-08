import { Message } from '@/types/messages';

export type GetMessageQueryType = {
  Params: {
    chatId: string;
    offset?: number;
    limit?: number;
  };
  Data: Message[];
};
