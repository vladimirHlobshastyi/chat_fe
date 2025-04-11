import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getMyProfile } from './requests';

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: getMyProfile,
    placeholderData: (prev) => prev,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.code === 'ERR_NETWORK') {
        return false;
      }
      return failureCount < 3;
    },
    throwOnError: (error) => {
      return (
        axios.isAxiosError(error) &&
        error.code === 'ERR_NETWORK: You have not connection.'
      );
    },
  });
};
