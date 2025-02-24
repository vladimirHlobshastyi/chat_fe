import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dialogs')({
  component: () => (
    <div>
      <h1>Dialogs</h1>
    </div>
  ),
});
