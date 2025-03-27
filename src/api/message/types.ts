import { Message } from '@/types/messages';

export type GetMessageQueryType = {
  Params: string;
  Data: { data: Message[] };
};
