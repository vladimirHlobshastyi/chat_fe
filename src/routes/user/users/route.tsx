import { createFileRoute } from '@tanstack/react-router';
import Users from './~Users.component';

export const Route = createFileRoute('/user/users')({
  component: Users,
});
