import { Outlet } from '@tanstack/react-router';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <AdminSidebar />
      <div className='relative w-full h-full'>
        <AdminHeader />
        <div className='h-[calc(100%-74px)]'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
