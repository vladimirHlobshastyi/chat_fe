import { Message } from '@/types/messages';

export interface MessageGroupProps {
  messages: Message[];
  partnerAvatar?: string;
  partnerName?: string;
  currentUserId: string;
}
