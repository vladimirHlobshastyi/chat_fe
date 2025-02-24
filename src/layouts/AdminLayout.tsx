import { Outlet } from '@tanstack/react-router';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
