import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { EditAdminData } from './~Admins.types';
import { User } from '@/types/user';
import { AddAdminFormData } from '@/forms/AddAdminForm/AddAdminForm.types';
import { SortState } from '@/types/common';
import { useQueryClient } from '@tanstack/react-query';
import { initialSortProps, updatedAtSortProps } from '@/common/common';

export const useAdmins = () => {
  const [page, setPage] = useState(1);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | undefined>();
  const [addNewAdminError, setAddNewAdminError] = useState<
    string | undefined
  >();
  const [editAdminError, setEditAdminError] = useState<string | undefined>();
  const [sort, setSort] = useState<SortState>(initialSortProps);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, isFetching } = useUsersQuery({
    page: page,
    pageSize: perPage,
    search: searchValue,
    sortField: sort.field,
    sortOrder: sort.direction,
    role: 'admin',
  });

  const queryClient = useQueryClient();

  const onSort = (sortValue: SortState) => {
    setPage(1);
    setSort(sortValue);
  };

  const handledSelectedAdmin = selectedAdmin && {
    name: selectedAdmin.name,
    email: selectedAdmin.email || '',
    isVerified: selectedAdmin.isVerified,
    isBanned: selectedAdmin.isBanned,
    avatar: selectedAdmin.avatar,
  };

  const admins = data?.data || [];
  const { total, totalPages } = data?.pagination || {};

  const createAdmin = useCreateUserMutation();
  const updateAdmin = useUpdateUserMutation();
  const deleteAdmin = useDeleteUserMutation();

  const onDeleteAdmin = (adminId: string) => {
    deleteAdmin.mutate(adminId, {
      onError: () => {
        console.error(`Failed to delete admin with ID: ${adminId}`);
      },
    });
  };

  const onEditAdminClose = () => {
    setSelectedAdmin(undefined);
    setEditAdminError(undefined);
  };

  const onAddNewAdminClose = () => {
    setIsAddAdminModalOpen(false);
    setAddNewAdminError(undefined);
  };

  const handleCreateAdmin = (data: AddAdminFormData) => {
    createAdmin.mutate(
      { role: 'admin', ...data, isBanned: false, about: '' }, //TODO will change mock
      {
        onSuccess: () => {
          setAddNewAdminError(undefined);
          setIsAddAdminModalOpen(false);
          onSort(initialSortProps);
        },
        onError: () =>
          setAddNewAdminError('Сan`t create a admin, try again later'),
      },
    );
  };

  const handleUpdateAdmin = (data: EditAdminData) => {
    if (selectedAdmin?.id) {
      updateAdmin.mutate(
        { id: selectedAdmin.id, data },
        {
          onSuccess: () => {
            setEditAdminError(undefined);
            setSelectedAdmin(undefined);
            onSort(updatedAtSortProps);
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });
          },
          onError: () =>
            setEditAdminError('Сan`t update the admin, try again later'),
        },
      );
    }
  };

  return {
    admins,
    isLoading: isLoading || isFetching,
    error,
    page,
    total,
    totalPages,
    isAddAdminModalOpen,
    selectedAdmin: handledSelectedAdmin,
    addNewAdminError,
    editAdminError,
    sort,
    searchValue,
    setSearchValue,
    onSort,
    setPerPage,
    onDeleteAdmin,
    setPage,
    handleCreateAdmin,
    handleUpdateAdmin,
    setIsAddAdminModalOpen,
    setSelectedAdmin,
    onEditAdminClose,
    onAddNewAdminClose,
  };
};
