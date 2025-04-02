import { Message } from '@/types/messages';

export type GetMessageQueryType = {
  Params: {
    chatId: string;
    before?: string;
    limit?: number;
  };
  Data: Message[];
};
