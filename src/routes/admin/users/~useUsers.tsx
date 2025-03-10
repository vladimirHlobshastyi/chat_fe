import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { User } from '@/types/user';
import { SortState } from '@/types/common';
import { CreateUserParams, UpdateUserParams } from '@/api/users/types';

export const useUsers = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({
    field: 'created_at',
    direction: 'desc',
  });
  const [searchValue, setSearchValue] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [addNewUserError, setAddNewUserError] = useState<string | undefined>();
  const [editUserError, setEditUserError] = useState<string | undefined>();
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, isFetching } = useUsersQuery({
    page: page,
    pageSize: perPage,
    search: searchValue,
    sortField: sort.field,
    sortOrder: sort.direction,
  });

  const users = data?.data || [];
  const { total, totalPages } = data?.pagination || {};

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  const onDeleteUser = (userId: string) => {
    deleteUser.mutate(userId, {
      onError: () => {
        console.error(`Failed to delete user with ID: ${userId}`);
      },
    });
  };

  const onEditUserClose = () => {
    setSelectedUser(undefined);
    setEditUserError(undefined);
  };

  const onAddNewUserClose = () => {
    setIsAddUserModalOpen(false);
    setAddNewUserError(undefined);
  };

  const handleCreateUser = (data: CreateUserParams) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setAddNewUserError(undefined);
        setIsAddUserModalOpen(false);
      },
      onError: () => setAddNewUserError('Сan`t create a user, try again later'),
    });
  };

  const handleUpdateUser = (data: UpdateUserParams) => {
    if (selectedUser?.id) {
      updateUser.mutate(
        { id: selectedUser.id, data },
        {
          onSuccess: () => {
            setEditUserError(undefined);
            setSelectedUser(undefined);
          },
          onError: () =>
            setEditUserError('Сan`t update the user, try again later'),
        },
      );
    }
  };

  return {
    users,
    isLoading: isLoading || isFetching,
    error,
    page,
    isAddUserModalOpen,
    selectedUser,
    addNewUserError,
    editUserError,
    sort,
    total,
    totalPages,
    searchValue,
    setSearchValue,
    setSort,
    setPerPage,
    onDeleteUser,
    setPage,
    handleCreateUser,
    handleUpdateUser,
    setIsAddUserModalOpen,
    setSelectedUser,
    onEditUserClose,
    onAddNewUserClose,
  };
};
