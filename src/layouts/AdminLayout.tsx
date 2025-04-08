import { Outlet } from '@tanstack/react-router';
import SideBar from './SideBar';
import RoleProvider from '@/providers/RoleProvider';

const AdminLayout = () => {
  return (
    <RoleProvider requiredRole='admin'>
      <div className='w-full h-screen flex bg-secondary-dark'>
        <SideBar variant='admin' />
        <Outlet />
      </div>
    </RoleProvider>
  );
};

export default AdminLayout;
