import { createFileRoute } from '@tanstack/react-router';
import Login from './~Login.component';

export const Route = createFileRoute('/login')({
  component: () => <Login />,
});
