import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { SortField, SortState } from './~Users.types';

const ITEMS_PER_PAGE = 20;

export const useUsers = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortState>({
    field: 'createdAt',
    order: 'desc',
  });

  const { data, error, isLoading, isFetching } = useUsersQuery({
    limit: ITEMS_PER_PAGE,
    offset: page * ITEMS_PER_PAGE,
  });

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

  const users = data ?? [];
  const hasMore = users.length === ITEMS_PER_PAGE;

  return {
    users,
    isLoading,
    error,
    isFetching,
    page,
    setPage,
    sort,
    handleSort,
    getSortIcon,
    handleHeaderClick,
    hasMore,
    createUser,
    updateUser,
    deleteUser,
  };
};
