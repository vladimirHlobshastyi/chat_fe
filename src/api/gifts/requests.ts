import axiosClient from '../axiosClient';
import {
  CreateGiftQueryType,
  GetGiftsQueryType,
  UpdateGiftQueryType,
  DeleteGiftQueryType,
} from './types';

export const getGifts = async (params: GetGiftsQueryType['Params']) => {
  const response = await axiosClient.get<GetGiftsQueryType['Data']>('/gifts', {
    params: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
      sortField: params.sortField,
      sortOrder: params.sortOrder,
    },
  });
  return response.data;
};

export const createGift = async (params: CreateGiftQueryType['Params']) => {
  const response = await axiosClient.post<CreateGiftQueryType['Data']>(
    '/gifts',
    params,
  );
  return response.data;
};

export const updateGift = async (params: UpdateGiftQueryType['Params']) => {
  const response = await axiosClient.put<UpdateGiftQueryType['Data']>(
    `/gifts/${params.id}`,
    params.data,
  );
  return response.data;
};

export const deleteGift = async (params: DeleteGiftQueryType['Params']) => {
  const response = await axiosClient.delete<DeleteGiftQueryType['Data']>(
    `/gifts/${params}`,
  );
  return response.data;
};
