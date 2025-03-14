import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { EditChatterData } from './~Chatter.types';
import { User } from '@/types/user';
import { SortState } from '@/types/common';
import { AddChatterFormData } from '@/forms/AddChatterForm/AddChatterForm.types';

export const useChatters = () => {
  const [page, setPage] = useState(1);
  const [isAddChatterModalOpen, setIsAddChatterModalOpen] = useState(false);
  const [selectedChatter, setSelectedChatter] = useState<User | undefined>();
  const [addNewChatterError, setAddNewChatterError] = useState<
    string | undefined
  >();
  const [editChatterError, setEditChatterError] = useState<
    string | undefined
  >();
  const [sort, setSort] = useState<SortState>({
    field: 'created_at',
    direction: 'desc',
  });
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, isFetching } = useUsersQuery({
    page: page,
    pageSize: perPage,
    search: searchValue,
    sortField: sort.field,
    sortOrder: sort.direction,
    role: 'chatter',
  });

  const onSort = (sortValue: SortState) => {
    setPage(1);
    setSort(sortValue);
  };

  const handledSelectedChatter = selectedChatter && {
    name: selectedChatter.name,
    email: selectedChatter.email || '',
    isVerified: selectedChatter.isVerified,
    isBanned: selectedChatter.isBanned,
  };

  const chatters = data?.data || [];
  const { total, totalPages } = data?.pagination || {};

  const createChatter = useCreateUserMutation();
  const updateChatter = useUpdateUserMutation();
  const deleteChatter = useDeleteUserMutation();

  const onDeleteChatter = (chatterId: string) => {
    deleteChatter.mutate(chatterId, {
      onError: () => {
        console.error(`Failed to delete chatter with ID: ${chatterId}`);
      },
    });
  };

  const onEditChatterClose = () => {
    setSelectedChatter(undefined);
    setEditChatterError(undefined);
  };

  const onAddNewChatterClose = () => {
    setIsAddChatterModalOpen(false);
    setAddNewChatterError(undefined);
  };

  const handleCreateChatter = (data: AddChatterFormData) => {
    createChatter.mutate(
      { role: 'chatter', ...data, isBanned: false, about: '' }, //TODO will change mock
      {
        onSuccess: () => {
          setAddNewChatterError(undefined);
          setIsAddChatterModalOpen(false);
        },
        onError: () =>
          setAddNewChatterError('Сan`t create a chatter, try again later'),
      },
    );
  };

  const handleUpdateChatter = (data: EditChatterData) => {
    if (selectedChatter?.id) {
      updateChatter.mutate(
        { id: selectedChatter.id, data },
        {
          onSuccess: () => {
            setEditChatterError(undefined);
            setSelectedChatter(undefined);
          },
          onError: () =>
            setEditChatterError('Сan`t update the chatter, try again later'),
        },
      );
    }
  };

  return {
    chatters,
    isLoading: isLoading || isFetching,
    error,
    page,
    total,
    totalPages,
    isAddChatterModalOpen,
    selectedChatter: handledSelectedChatter,
    addNewChatterError,
    editChatterError,
    sort,
    searchValue,
    setSearchValue,
    onSort,
    setPerPage,
    onDeleteChatter,
    setPage,
    handleCreateChatter,
    handleUpdateChatter,
    setIsAddChatterModalOpen,
    setSelectedChatter,
    onEditChatterClose,
    onAddNewChatterClose,
  };
};
