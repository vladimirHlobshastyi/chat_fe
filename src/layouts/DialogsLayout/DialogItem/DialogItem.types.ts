import { Chat } from '@/api/chats/types';
import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';

export interface DialogItemProps {
  chat: Chat;
  role: RequiredRole;
  className?: string;
  onSelect: () => void;
} //TODO will improve
