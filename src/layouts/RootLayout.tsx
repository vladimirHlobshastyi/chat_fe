import { Outlet } from '@tanstack/react-router';
import SideBar from './SideBar';
import RoleProvider from '@/providers/RoleProvider';
import { useState } from 'react';
import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';
import Header from './Header';
import MobileHeader from './MobileHeader';

const RootLayout = ({ variant }: { variant: RequiredRole }) => {
  const [isHiddenHeader, setIsHiddenHeader] = useState(true);
  const [isMobileHeaderHidden, setIsMobileHeaderHidden] = useState(true);

  return (
    <RoleProvider requiredRole={variant}>
      <div className='w-full h-screen flex flex-row bg-secondary-dark'>
        <SideBar
          variant={variant}
          isHidden={isHiddenHeader}
          setIsHidden={() => setIsHiddenHeader(true)}
        />
        <div className='w-full h-full flex flex-col overflow-hidden'>
          <Header
            role={variant}
            isHidden={isHiddenHeader}
            onHide={setIsHiddenHeader}
            onMobHeaderHide={setIsMobileHeaderHidden}
          />
          {!isMobileHeaderHidden && <MobileHeader role={variant} />}
          <Outlet />
        </div>
      </div>
    </RoleProvider>
  );
};

export default RootLayout;
