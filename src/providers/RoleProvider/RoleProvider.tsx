import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Loader from '@/components/Loader';
import { useMyProfileQuery } from '@/api/me/hooks';

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
      navigate({ to: `/${myRole}/dialogs` });
    }
  }, [myRole, requiredRole, navigate]);

  if (!myProfile) return <Loader />;

  return children;
};

export default RoleProvider;
