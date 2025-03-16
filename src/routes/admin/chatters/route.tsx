import { createFileRoute } from '@tanstack/react-router';
import Chatters from './~Chatter.component';

export const Route = createFileRoute('/admin/chatters')({
  component: Chatters,
});
