import { createFileRoute } from '@tanstack/react-router';
import Admins from './~Admins.component';

export const Route = createFileRoute('/admin/admins')({
  component: Admins,
});
