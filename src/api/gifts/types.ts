import { QueriesParams } from '@/types/queries';
import { Pagination } from '@/types/common';
import { Gift } from '@/types/gift';

export type GetGiftsQueryType = {
  Params: QueriesParams;
  Data: { data: Gift[]; pagination: Pagination };
};

interface GiftParams {
  name: string;
  price?: number;
  image?: string;
  restrictedCountries?: string[];
  isActive: boolean;
}

export type CreateGiftQueryType = {
  Params: GiftParams;
  Data: Gift;
};

export type UpdateGiftQueryType = {
  Params: {
    id: string;
    data: GiftParams;
  };
  Data: Gift;
};

export type DeleteGiftQueryType = {
  Params: string; // Gift ID
  Data: void;
};
