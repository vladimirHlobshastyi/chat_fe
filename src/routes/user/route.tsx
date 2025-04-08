import RootLayout from '@/layouts/RootLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user')({
  component: RootLayout,
});
