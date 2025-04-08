import { createFileRoute } from '@tanstack/react-router';
import Models from './~Models.component';

export const Route = createFileRoute('/user/models')({
  component: Models,
});
