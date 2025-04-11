import AuthProvider from '@/providers/AuthProvider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ErrorFallback } from './~ErrorFallBack.component';

export const Route = createRootRoute({
  notFoundComponent: () => <>Not found</>,
  errorComponent: ErrorFallback,
  component: () => (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  ),
});
