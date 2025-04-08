import { createFileRoute } from '@tanstack/react-router';
import Gifts from './~Gifts.component';

export const Route = createFileRoute('/user/gifts')({
  component: Gifts,
});
