import { Outlet } from '@tanstack/react-router';
import SideBar from './SideBar';
import RoleProvider from '@/providers/RoleProvider';
import { useState } from 'react';
import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';
import Header from './Header';

const RootLayout = ({ variant }: { variant: RequiredRole }) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <RoleProvider requiredRole={variant}>
      <div className='w-full h-screen flex flex-row bg-secondary-dark'>
        <SideBar variant={variant} isHidden={isHidden} />
        <div className='w-full h-full flex flex-col'>
          <Header
            role={variant}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
          <Outlet />
        </div>
      </div>
    </RoleProvider>
  );
};

export default RootLayout;
