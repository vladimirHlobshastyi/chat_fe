import { Gift } from '@/types/gift';

export type GetGiftsQueryType = {
  Params: {
    limit: number;
    offset: number;
  };
  Data: Gift[];
};

export type CreateGiftQueryType = {
  Params: FormData;
  Data: Gift;
};

export type UpdateGiftQueryType = {
  Params: {
    id: string;
    data: FormData;
  };
  Data: Gift;
};

export type DeleteGiftQueryType = {
  Params: string; // Gift ID
  Data: void;
};
