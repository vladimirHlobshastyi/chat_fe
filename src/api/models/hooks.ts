import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createModel, deleteModel, getModels, updateModel } from './requests';
import { GetModelsQueryType } from './types';

export const useModelsQuery = (params: GetModelsQueryType['Params']) => {
  return useQuery({
    queryKey: ['models', params],
    queryFn: () => getModels(params),
    placeholderData: (prev) => prev,
  });
};

export const useCreateModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });
};

export const useUpdateModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });
};

export const useDeleteModelMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });
};
