import DialogsLayout from '@/layouts/DialogsLayout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/user/dialogs')({
  component: () => <DialogsLayout role='user' />,
});
