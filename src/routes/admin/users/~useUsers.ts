import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { SortField, SortState } from './~Users.types';
import { User } from '@/types/user';
import { ITEMS_PER_PAGE } from './~Users.data';

export const useUsers = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortState>({
    field: 'createdAt',
    order: 'desc',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [addNewUserError, setAddNewUserError] = useState<string | undefined>();
  const [editUserError, setEditUserError] = useState<string | undefined>();

  const { data, error, isLoading, isFetching } = useUsersQuery({
    limit: ITEMS_PER_PAGE,
    offset: page * ITEMS_PER_PAGE,
  });

  const users = data || [];
  const hasMore = users.length === ITEMS_PER_PAGE;

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  const handleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) return;
    return sort.order === 'asc' ? '↑' : '↓';
  };

  const handleHeaderClick = (field: SortField) => () => handleSort(field);

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
    setIsAddModalOpen(false);
    setAddNewUserError(undefined);
  };

  const handleCreateUser = (data: User) => {
    createUser.mutate(data, {
      onSuccess: () => {
        setAddNewUserError(undefined);
        setIsAddModalOpen(false);
      },
      onError: () => setAddNewUserError('Сan`t create a user, try again later'),
    });
  };

  const handleUpdateUser = (data: Partial<User>) => {
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
    isLoading,
    error,
    isFetching,
    page,
    hasMore,
    isAddModalOpen,
    selectedUser,
    addNewUserError,
    editUserError,
    onDeleteUser,
    setPage,
    getSortIcon,
    handleHeaderClick,
    handleCreateUser,
    handleUpdateUser,
    setIsAddModalOpen,
    setSelectedUser,
    onEditUserClose,
    onAddNewUserClose,
  };
};
