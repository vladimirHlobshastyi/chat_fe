import { useState, useEffect } from 'react';
import { AuthContext } from './useAuth';
import { useNavigate } from '@tanstack/react-router';
import Loader from '@/components/Loader';
import { useMyProfileQuery } from '@/api/me/hooks';
import { useAuthStore } from '@/store/authStore/useAuthStore';
import { useMyProfileStore } from '@/store/myProfileStore/useMyProfileStore';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticatedStore = useAuthStore((s) => s.isAuthenticated);
  const setIsAuthenticatedStore = useAuthStore((s) => s.setIsAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => isAuthenticatedStore,
  );
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const { data: myProfile, isLoading } = useMyProfileQuery();
  const setMyProfile = useMyProfileStore((s) => s.setMyProfile);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthenticatedStore(true);
    } else {
      setIsAuthenticatedStore(false);
      if (window.location.pathname !== '/login') {
        navigate({ to: '/login' });
      }
    }

    if (isAuthenticated && myProfile?.data) {
      setMyProfile(myProfile?.data);
    }

    setIsReady(true);
  }, [isAuthenticated, myProfile?.data]);

  if (!isReady || isLoading) return <Loader />; //TODO will check Loader blinking

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
