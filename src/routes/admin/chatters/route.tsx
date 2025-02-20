import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/chatters')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Chatters!</div>;
}
