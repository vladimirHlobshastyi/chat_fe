import { H1 } from '@/components/Typography/Typography.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/transactions')({
  component: () => (
    <div className='w-full h-full bg-gray-50 flex justify-center items-center'>
      <H1>Will be soon</H1>
    </div>
  ),
});
