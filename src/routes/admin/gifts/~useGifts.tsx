import {
  useCreateGiftMutation,
  useDeleteGiftMutation,
  useGiftsQuery,
  useUpdateGiftMutation,
} from '@/api/gifts/hooks';
import { Gift } from '@/types/gift';
import { useState } from 'react';
import { AddNewGiftFormData } from '@/forms/AddNewGiftForm/AddNewGiftForm.types';
import { EditGiftFormData } from '@/forms/EditGiftForm/EditGiftForm.types';
import { SortState } from '@/types/common';

export const useGifts = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({
    field: 'created_at',
    direction: 'desc',
  });
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [isAddNewGiftModalOpen, setIsAddNewGiftModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | undefined>();
  const [addNewGiftError, setAddNewGiftError] = useState<string>('');
  const [editGiftError, setEditGiftError] = useState<string>('');

  const {
    data: gifts,
    isLoading,
    error,
    isFetching,
  } = useGiftsQuery({
    page: page,
    pageSize: perPage,
    search: searchValue,
    sortField: sort.field,
    sortOrder: sort.direction,
  });

  const { total, totalPages } = gifts?.pagination || {};

  const onSort = (sortValue: SortState) => {
    setPage(1);
    setSort(sortValue);
  };

  const handleEditGift = (currentGift: Gift): EditGiftFormData => {
    return {
      name: currentGift.name,
      restrictedCountries: [], //TODO will change
      image: currentGift.image,
      price: currentGift.price,
      isActive: currentGift.isActive,
    };
  };

  const editInitialProps = selectedGift && handleEditGift(selectedGift);

  const onEditGiftClose = () => {
    setSelectedGift(undefined);
    setEditGiftError('');
  };

  const createGiftMutation = useCreateGiftMutation();
  const editGiftMutation = useUpdateGiftMutation();
  const deleteGiftMutation = useDeleteGiftMutation();

  const onAddNewGiftModalClose = () => {
    setIsAddNewGiftModalOpen(false);
    setAddNewGiftError('');
  };

  const onCreateGiftSubmit = (createData: AddNewGiftFormData) => {
    createGiftMutation.mutate(
      { ...createData, restrictedCountries: [] },
      {
        onSuccess: () => {
          onAddNewGiftModalClose();
          console.log('Gift created successfully');
        },
        onError: () => {
          setAddNewGiftError('Can`t create a new Gift');
        },
      },
    );
  };

  const onEditGiftSubmit = (createData: EditGiftFormData) => {
    if (selectedGift?.id)
      editGiftMutation.mutate(
        {
          id: selectedGift?.id,
          data: { ...createData, restrictedCountries: [] },
        },
        {
          onSuccess: () => {
            onEditGiftClose();
            console.log('Gift updated successfully');
          },
          onError: () => {
            setEditGiftError('Can`t edit the Gift');
          },
        },
      );
  };

  const onDeleteGift = (giftId: string) => {
    deleteGiftMutation.mutate(giftId, {
      onError: () => {
        console.error(`Failed to delete Gift with ID: ${giftId}`);
      },
    });
  };

  return {
    isAddNewGiftModalOpen,
    addNewGiftError,
    editGiftError,
    editInitialProps,
    gifts: gifts?.data || [],
    isLoading: isLoading || isFetching,
    error,
    page,
    sort,
    perPage,
    searchValue,
    total,
    totalPages,
    setSearchValue,
    setPerPage,
    onSort,
    setPage,
    onEditGiftClose,
    onDeleteGift,
    onEditGiftSubmit,
    onCreateGiftSubmit,
    onAddNewGiftModalClose,
    setIsAddNewGiftModalOpen,
    setSelectedGift,
  };
};
