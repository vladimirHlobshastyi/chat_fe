import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import ReactTimeAgo from 'react-time-ago';
import { DialogItemProps } from './DialogItem.types';
import { useChatStore } from '@/store/chatStore/useChatStore';
import { getUserStatus } from '@/utils/date';
import { useWebSocket } from '@/providers/WebSocketProvider/useWebSocket';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/utils/styles';
import { Chat } from '@/api/chats/types';
import { useUnreadPerChatQuery } from '@/api/chats/hooks';
import MessageCounter from '@/components/MessageCounter';

const DialogItem = ({ chat, role }: DialogItemProps) => {
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const navigate = useNavigate();
  const onlineUsers = useChatStore((s) => s.onlineUsers);
  const queryClient = useQueryClient();
  const matchRoute = useMatchRoute();

  const ws = useWebSocket();

  const { data: unreadByChat } = useUnreadPerChatQuery();

  const chatId = chat.chat_id;
  const unreadMessageCount = unreadByChat?.[chatId] || 0;
  const isOnlineCurrentU = onlineUsers.has(chat.partner_id);
  const isActive = matchRoute({
    to: `/${role}/dialogs/$userId`,
    params: { userId: chat.partner_id },
  });

  useEffect(() => {
    if (!ws || !chatId) return;

    const handleMessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'typing' && msg.chatId === chatId) {
        setIsPartnerTyping(msg.isTyping);
      }

      if (msg.type === 'new_message' && msg.data.chat_id === chatId) {
        queryClient.setQueryData(['chats'], (old: Chat[] = []) => {
          return old.map((chat) =>
            chat.chat_id === msg.data.chat_id
              ? {
                  ...chat,
                  last_message: msg.data.text,
                  last_message_time: new Date(msg.data.created_at),
                }
              : chat,
          );
        });
      }
    };

    ws.addEventListener('message', handleMessage);
    return () => ws.removeEventListener('message', handleMessage);
  }, [ws, chatId, queryClient]);

  return (
    <div
      key={chat.partner_id}
      className={cn(
        'flex items-center gap-3 cursor-pointer rounded-xl p-3',
        isActive ? 'bg-blue-50 text-primary' : 'hover:bg-gray-150',
      )}
      onClick={() => navigate({ to: `/${role}/dialogs/${chat.partner_id}` })}
    >
      <Avatar
        className={cn(
          isActive && !chat.partner_avatar && 'ring-1 ring-offset-ring-success',
        )}
        userStatus={getUserStatus(isOnlineCurrentU, chat.last_seen)}
        size='md'
        src={chat.partner_avatar}
        initials={getInitials(chat.partner_name)}
      />
      <div className='flex flex-1 flex-col text-sm'>
        <span className='font-medium'>{chat.partner_name}</span>
        <span
          className={cn(
            'text-gray-500 truncate max-w-32',
            isPartnerTyping && 'animate-pulse',
          )}
        >
          {isPartnerTyping
            ? 'typing...'
            : chat.last_message || 'No messages yet...'}
        </span>
      </div>
      <div className='flex h-full flex-col justify-between items-start'>
        {chat.last_message_time && (
          <ReactTimeAgo
            className='text-xs text-gray-400'
            date={chat.last_message_time}
            locale='en'
            timeStyle='twitter'
          />
        )}
        {unreadMessageCount > 0 && (
          <MessageCounter value={unreadMessageCount} />
        )}
      </div>
    </div>
  );
};

export default DialogItem;
