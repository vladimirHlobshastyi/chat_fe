import { useMutation } from '@tanstack/react-query';
import { login } from './requests';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/providers/AuthProvider/useAuth';

export const useLoginMutation = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      setIsAuthenticated(true);
      navigate({ to: '/admin/users' });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
