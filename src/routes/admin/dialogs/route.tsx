//import { H1 } from '@/components/Typography/Typography.component';
import DialogsLayout from '@/layouts/DialogsLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/dialogs')({
  component: DialogsLayout,
});
