import { createFileRoute, Outlet } from '@tanstack/react-router';
import AdminLayout from '@/layouts/AdminLayout';
import PrivateRoutesProvider from '@/providers/PrivateRoutesProvider';

export const Route = createFileRoute('/admin')({
  component: () => (
    <PrivateRoutesProvider>
      <AdminLayout />
      <Outlet />
    </PrivateRoutesProvider>
  ),
});
