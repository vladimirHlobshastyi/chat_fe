import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMyProfileQuery } from '@/api/me/hooks';
import Loader from '@/components/Loader';

const RoleProvider = ({
  requiredRole,
  children,
}: {
  requiredRole: 'user' | 'admin';
  children: React.ReactNode;
}) => {
  const { data: myProfile } = useMyProfileQuery();
  const navigate = useNavigate();
  const myRole = myProfile?.data.role;

  useEffect(() => {
    if (myRole && myRole !== requiredRole) {
      navigate({ to: `/${myRole}` });
    }
  }, [myRole, requiredRole, navigate]);

  if (!myRole) return <Loader />;

  return children;
};

export default RoleProvider;
