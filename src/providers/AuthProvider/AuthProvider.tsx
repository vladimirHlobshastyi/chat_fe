import { useState, useEffect } from 'react';
import { AuthContext } from './useAuth';
import { useNavigate } from '@tanstack/react-router';
import Loader from '@/components/Loader';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('isAuthenticated'),
  );
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
      if (window.location.pathname !== '/login') {
        navigate({ to: '/login' });
      }
    }
    setIsReady(true);
  }, [isAuthenticated]);

  if (!isReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
