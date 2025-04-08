import { useState } from 'react';
import {
  useModelsQuery,
  useCreateModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} from '@api/models/hooks';
import { Model } from '@/types/model';
import { SortState } from '@/types/common';
import { CreateModelParams, UpdateModelParams } from '@/api/models/types';
import { useMyProfileQuery } from '@/api/me/hooks';
import { initialSortProps, updatedAtSortProps } from '@/common/common';

export const useModels = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>(initialSortProps);
  const [searchValue, setSearchValue] = useState('');
  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | undefined>();
  const [addNewModelError, setAddNewModelError] = useState<
    string | undefined
  >();
  const [editModelError, setEditModelError] = useState<string | undefined>();
  const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading, isFetching } = useModelsQuery({
    role: 'model',
    page: page,
    pageSize: perPage,
    search: searchValue,
    sortField: sort.field,
    sortOrder: sort.direction,
  });

  const { data: myProfile } = useMyProfileQuery();
  const myId = Number(myProfile?.data?.id);

  const models = data?.data || [];
  const { total, totalPages } = data?.pagination || {};

  const createModel = useCreateModelMutation();
  const updateModel = useUpdateModelMutation();
  const deleteModel = useDeleteModelMutation();

  const handledSelectedModel = selectedModel && {
    name: selectedModel.name,
    geo: selectedModel.geo,
    about: selectedModel.about,
    avatar: selectedModel.avatar,
    createdBy: myId,
  };

  const onSort = (sortValue: SortState) => {
    setPage(1);
    setSort(sortValue);
  };

  const onDeleteModel = (modelId: string) => {
    deleteModel.mutate(modelId, {
      onError: () => {
        console.error(`Failed to delete model with ID: ${modelId}`);
      },
    });
  };

  const onEditModelClose = () => {
    setSelectedModel(undefined);
    setEditModelError(undefined);
  };

  const onAddNewModelClose = () => {
    setIsAddModelModalOpen(false);
    setAddNewModelError(undefined);
  };

  const handleCreateModel = (data: CreateModelParams) => {
    createModel.mutate(
      { ...data, createdBy: myId },
      {
        onSuccess: () => {
          setAddNewModelError(undefined);
          setIsAddModelModalOpen(false);
          onAddNewModelClose();
          onSort(initialSortProps);
        },
        onError: () =>
          setAddNewModelError('Сan`t create a model, try again later'),
      },
    );
  };

  const handleUpdateModel = (data: UpdateModelParams) => {
    if (selectedModel?.id) {
      updateModel.mutate(
        { id: selectedModel.id, data },
        {
          onSuccess: () => {
            setEditModelError(undefined);
            setSelectedModel(undefined);
            onEditModelClose();
            onSort(updatedAtSortProps);
          },
          onError: () =>
            setEditModelError('Сan`t update the model, try again later'),
        },
      );
    }
  };

  return {
    models,
    isLoading: isLoading || isFetching,
    error,
    page,
    isAddModelModalOpen,
    selectedModel: handledSelectedModel,
    addNewModelError,
    editModelError,
    sort,
    total,
    totalPages,
    searchValue,
    setSearchValue,
    onSort,
    setPerPage,
    onDeleteModel,
    setPage,
    handleCreateModel,
    handleUpdateModel,
    setIsAddModelModalOpen,
    setSelectedModel,
    onEditModelClose,
    onAddNewModelClose,
  };
};
