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
      limit: params.limit,
      offset: params.offset,
    },
  });
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
