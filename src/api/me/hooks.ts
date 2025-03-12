import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from './requests';

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    placeholderData: (prev) => prev,
  });
};
