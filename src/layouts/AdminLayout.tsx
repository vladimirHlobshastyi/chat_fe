import { Outlet } from '@tanstack/react-router';

const AdminLayout = () => {
  return (
    <div>
      <aside>{/* SideBar */}</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
