import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from './requests';

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getMyProfile(),
    placeholderData: (prev) => prev,
  });
};
