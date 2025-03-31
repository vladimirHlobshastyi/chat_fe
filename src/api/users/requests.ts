import axiosClient from '../axiosClient';
import {
  CreateUserQueryType,
  DeleteUserQueryType,
  GetUsersQueryType,
  UpdateUserQueryType,
} from './types';

export const getUsers = async (params: GetUsersQueryType['Params']) => {
  const response = await axiosClient.get<GetUsersQueryType['Data']>('/users', {
    params: {
      search: params.search,
      page: params.page,
      pageSize: params.pageSize,
      sortField: params.sortField,
      sortOrder: params.sortOrder,
      role: params.role,
    },
  });
  return response.data;
};

export const updateLastSeen = async () => {
  const response = await axiosClient.post('/users/update-last-seen');
  return response.data;
};

export const createUser = async (params: CreateUserQueryType['Params']) => {
  const response = await axiosClient.post<CreateUserQueryType['Data']>(
    '/users',
    params,
  );
  return response.data;
};

export const updateUser = async (params: UpdateUserQueryType['Params']) => {
  const response = await axiosClient.put<UpdateUserQueryType['Data']>(
    `/users/${params.id}`,
    params.data,
  );
  return response.data;
};

export const deleteUser = async (params: DeleteUserQueryType['Params']) => {
  const response = await axiosClient.delete<DeleteUserQueryType['Data']>(
    `/users/${params}`,
  );
  return response.data;
};
