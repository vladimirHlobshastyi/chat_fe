import { createFileRoute } from '@tanstack/react-router';
import Users from './~Users.component';

export const Route = createFileRoute('/admin/users')({
  component: Users,
});
