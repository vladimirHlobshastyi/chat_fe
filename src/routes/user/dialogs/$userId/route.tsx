import { createFileRoute } from '@tanstack/react-router';
import DialogPage from './~Dialog.component';

export const Route = createFileRoute('/user/dialogs/$userId')({
  component: DialogPage,
});
