import { useMutation } from '@tanstack/react-query';
import { login } from './requests';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem('access_token', response.data.session.access_token);
      localStorage.setItem(
        'refresh_token',
        response.data.session.refresh_token,
      );
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
