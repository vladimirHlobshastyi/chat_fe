import { createFileRoute } from '@tanstack/react-router';
import Gifts from './~Gifts.component';

export const Route = createFileRoute('/admin/gifts')({
  component: Gifts,
});
