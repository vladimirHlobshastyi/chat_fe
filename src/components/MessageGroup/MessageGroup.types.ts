import { Message } from '@/types/messages';
import { Ref } from 'react';

export interface MessageGroupProps {
  messages: Message[];
  partnerAvatar?: string;
  partnerName?: string;
  currentUserId: string;
  lastPartnerMessageId?: string;
  lastMessageRef?: Ref<HTMLDivElement>;
}
