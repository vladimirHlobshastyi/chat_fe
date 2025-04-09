import { createFileRoute } from '@tanstack/react-router';
import Profile from './~Profile.component';

export const Route = createFileRoute('/user/profile')({
  component: () => <Profile />,
});
