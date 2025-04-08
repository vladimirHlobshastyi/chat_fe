import { Outlet } from '@tanstack/react-router';
import SideBar from './SideBar';
import RoleProvider from '@/providers/RoleProvider';

const RootLayout = () => {
  return (
    <RoleProvider requiredRole='user'>
      <div className='w-full h-screen flex bg-secondary-dark'>
        <SideBar variant='user' />
        <Outlet />
      </div>
    </RoleProvider>
  );
};

export default RootLayout;
