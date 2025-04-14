import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMyProfileStore } from '@/store/myProfileStore/useMyProfileStore';
import Loader from '@/components/Loader';

const RoleProvider = ({
  requiredRole,
  children,
}: {
  requiredRole: 'user' | 'admin';
  children: React.ReactNode;
}) => {
  const myProfile = useMyProfileStore((s) => s.myProfile);
  const navigate = useNavigate();
  const myRole = myProfile?.role;

  useEffect(() => {
    if (myRole && myRole !== requiredRole) {
      navigate({ to: `/${myRole}` });
    }
  }, [myRole, requiredRole, navigate]);

  if (!myProfile) return <Loader />;

  return children;
};

export default RoleProvider;
