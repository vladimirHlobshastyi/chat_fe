import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/tariffs')({
  component: () => (
    <div>
      <h1>Tariffs</h1>
    </div>
  ),
});
