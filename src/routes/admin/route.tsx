import { createFileRoute } from '@tanstack/react-router';
import RootLayout from '@/layouts/RootLayout';

export const Route = createFileRoute('/admin')({
  component: () => <RootLayout variant='admin' />,
});
