import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/transactions')({
  component: () => (
    <div>
      <h1>Transactions</h1>
    </div>
  ),
});
