import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGift, deleteGift, getGifts, updateGift } from './requests';
import { GetGiftsQueryType } from './types';

export const useGiftsQuery = (params: GetGiftsQueryType['Params']) => {
  return useQuery({
    queryKey: ['gifts', params],
    queryFn: () => getGifts(params),
    placeholderData: (prev) => prev,
  });
};

export const useCreateGiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
    },
  });
};

export const useUpdateGiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
    },
  });
};

export const useDeleteGiftMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGift,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts'] });
    },
  });
};
