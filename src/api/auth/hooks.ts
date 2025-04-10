import { useMutation } from '@tanstack/react-query';
import { login, logOut } from './requests';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/providers/AuthProvider/useAuth';

export const useLoginMutation = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      navigate({ to: data.role === 'admin' ? '/admin' : '/user' });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

export const useLogOutMutation = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      setIsAuthenticated(false);
      navigate({ to: '/login' });
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};
