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
    field: 'createdAt',
    direction: 'desc',
  });
  const [perPage, setPerPage] = useState(10);
  const [isAddNewGiftModalOpen, setIsAddNewGiftModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | undefined>();
  const [addNewGiftError, setAddNewGiftError] = useState<string>('');
  const [editGiftError, setEditGiftError] = useState<string>('');

  const handleEditGift = (currentGift: Gift): EditGiftFormData => {
    return {
      name: currentGift.name,
      geo: [{ label: 'UA', value: 'UA' }], //TODO will change
      price: currentGift.price,
      isActive: currentGift.isActive,
    };
  };

  const editInitialProps = selectedGift && handleEditGift(selectedGift);

  const onEditGiftClose = () => {
    setSelectedGift(undefined);
    setEditGiftError('');
  };

  const {
    data: gifts,
    isLoading,
    error,
    isFetching,
  } = useGiftsQuery({
    limit: perPage,
    offset: page === 1 ? 0 : page * perPage,
  });

  const createGiftMutation = useCreateGiftMutation();
  const editGiftMutation = useUpdateGiftMutation();
  const deleteGiftMutation = useDeleteGiftMutation();

  const onAddNewGiftModalClose = () => {
    setIsAddNewGiftModalOpen(false);
    setAddNewGiftError('');
  };

  const onCreateGiftSubmit = (createData: AddNewGiftFormData) => {
    const formData = new FormData();
    const { name, image, isActive, price } = createData;
    formData.append('name', name);
    if (image?.[0] instanceof File) {
      formData.append('image', image[0]);
    }
    formData.append('isActive', isActive.toString());
    if (price) {
      formData.append('price', price.toString());
    }
    createGiftMutation.mutate(formData, {
      onSuccess: () => {
        console.log('Gift created successfully');
      },
      onError: () => {
        setAddNewGiftError('Can`t create a new Gift');
      },
    });
  };

  const onEditGiftSubmit = (createData: EditGiftFormData) => {
    const formData = new FormData();
    const { name, image, isActive, price } = createData;
    formData.append('name', name);
    if (image?.[0] instanceof File) {
      formData.append('image', image[0]);
    }
    formData.append('isActive', isActive.toString());
    if (price) {
      formData.append('price', price.toString());
    }
    if (selectedGift?.id)
      editGiftMutation.mutate(
        { id: selectedGift?.id, data: formData },
        {
          onSuccess: () => {
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
    gifts: gifts || [],
    isLoading: isLoading || isFetching,
    error,
    page,
    selectedGift,
    sort,
    setPerPage,
    setSort,
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
