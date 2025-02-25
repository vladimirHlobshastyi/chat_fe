import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';
import { EditAdminData, SortField, SortState } from './~Admins.types';
import { User } from '@/types/user';
import { ITEMS_PER_PAGE } from './~Admins.data';
import { cn } from '@/utils/styles';
import { AddAdminFormData } from '@/forms/AddAdminForm/AddAdminForm.types';

export const useAdmins = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortState>({
    field: 'createdAt',
    order: 'desc',
  });
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | undefined>();
  const [addNewAdminError, setAddNewAdminError] = useState<
    string | undefined
  >();
  const [editAdminError, setEditAdminError] = useState<string | undefined>();

  const { data, error, isLoading, isFetching } = useUsersQuery({
    limit: ITEMS_PER_PAGE,
    offset: page * ITEMS_PER_PAGE,
  });

  const handledSelectedAdmin = selectedAdmin && {
    name: selectedAdmin.name,
    email: selectedAdmin.email || '',
    isVerified: selectedAdmin.isVerified,
    isBanned: selectedAdmin.isBanned,
  };

  const admins = data?.filter((user) => user.role === 'admin') || [];
  const hasMore = admins.length === ITEMS_PER_PAGE;

  const createAdmin = useCreateUserMutation();
  const updateAdmin = useUpdateUserMutation();
  const deleteAdmin = useDeleteUserMutation();

  const handleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sort.field === field;
    return (
      <span
        className={cn('sortIcon', isActive ? '' : 'sortIconHidden')}
        aria-hidden='true'
      >
        {sort.order === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const handleHeaderClick = (field: SortField) => () => handleSort(field);

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
      { role: 'admin', ...data },
      {
        onSuccess: () => {
          setAddNewAdminError(undefined);
          setIsAddAdminModalOpen(false);
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
          },
          onError: () =>
            setEditAdminError('Сan`t update the admin, try again later'),
        },
      );
    }
  };

  return {
    admins,
    isLoading,
    error,
    isFetching,
    page,
    hasMore,
    isAddAdminModalOpen,
    selectedAdmin: handledSelectedAdmin,
    addNewAdminError,
    editAdminError,
    onDeleteAdmin,
    setPage,
    getSortIcon,
    handleHeaderClick,
    handleCreateAdmin,
    handleUpdateAdmin,
    setIsAddAdminModalOpen,
    setSelectedAdmin,
    onEditAdminClose,
    onAddNewAdminClose,
  };
};
