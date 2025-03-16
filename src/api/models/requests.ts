import axiosClient from '../axiosClient';
import {
  CreateModelQueryType,
  DeleteModelQueryType,
  GetModelsQueryType,
  UpdateModelQueryType,
} from './types';

export const getModels = async (params: GetModelsQueryType['Params']) => {
  const response = await axiosClient.get<GetModelsQueryType['Data']>(
    '/models',
    {
      params: {
        search: params.search,
        page: params.page,
        pageSize: params.pageSize,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
        role: params.role,
      },
    },
  );
  return response.data;
};

export const createModel = async (params: CreateModelQueryType['Params']) => {
  const response = await axiosClient.post<CreateModelQueryType['Data']>(
    '/models',
    params,
  );
  return response.data;
};

export const updateModel = async (params: UpdateModelQueryType['Params']) => {
  const response = await axiosClient.put<UpdateModelQueryType['Data']>(
    `/models/${params.id}`,
    params.data,
  );
  return response.data;
};

export const deleteModel = async (params: DeleteModelQueryType['Params']) => {
  const response = await axiosClient.delete<DeleteModelQueryType['Data']>(
    `/models/${params}`,
  );
  return response.data;
};
