import { QueriesParams } from '@/types/queries';
import { Pagination } from '@/types/common';
import { Model } from '@/types/model';

export type GetModelsQueryType = {
  Params: QueriesParams;
  Data: { data: Model[]; pagination: Pagination };
};

export interface CreateModelParams {
  name: string;
  geo: string;
  avatar: string;
  about: string;
  createdBy: number;
  favoriteGifts?: string[];
}

export type CreateModelQueryType = {
  Params: Partial<CreateModelParams>;
  Data: Model;
};

export type UpdateModelParams = CreateModelParams;

export type UpdateModelQueryType = {
  Params: {
    id: string;
    data: Partial<UpdateModelParams>;
  };
  Data: string;
};

export type DeleteModelQueryType = {
  Params: string;
  Data: void;
};
