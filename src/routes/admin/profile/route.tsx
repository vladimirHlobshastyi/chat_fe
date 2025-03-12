import { createFileRoute } from '@tanstack/react-router';
import Profile from './~Profile.component';

export const Route = createFileRoute('/admin/profile')({
  component: () => <Profile />,
});
