import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/gifts')({
  component: () => (
    <div>
      <h1>Gifts</h1>
    </div>
  ),
});
