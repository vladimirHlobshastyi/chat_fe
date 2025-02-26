import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../AuthProvider/useAuth';
import { useEffect } from 'react';

const PrivateRoutesProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRoutesProvider;
