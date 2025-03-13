import { createFileRoute } from '@tanstack/react-router';
import Models from './~Models.component';

export const Route = createFileRoute('/admin/models')({
  component: Models,
});
