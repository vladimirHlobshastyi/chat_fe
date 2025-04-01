import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { useNavigate } from '@tanstack/react-router';
import ReactTimeAgo from 'react-time-ago';
import { DialogItemProps } from './DialogItem.types';
import { useChatStore } from '@/store/chatStore/useChatStore';
import { getUserStatus } from '@/utils/date';

const DialogItem = ({ chat }: DialogItemProps) => {
  const navigate = useNavigate();
  const onlineUsers = useChatStore((s) => s.onlineUsers);
  const isOnlineCurrentU = onlineUsers.has(chat.partner_id);
  return (
    <div
      key={chat.partner_id}
      className='flex items-center gap-3 cursor-pointer hover:bg-gray-150 rounded-xl p-3'
      onClick={() => navigate({ to: `/admin/dialogs/${chat.partner_id}` })}
    >
      <Avatar
        userStatus={getUserStatus(isOnlineCurrentU, chat.last_seen)}
        size='md'
        src={chat.partner_avatar}
        initials={getInitials(chat.partner_name)}
      />
      <div className='flex flex-1 flex-col text-sm'>
        <span className='font-medium'>{chat.partner_name}</span>
        <span className='text-gray-500 truncate max-w-[150px]'>
          {chat.last_message || 'No messages yet...'}
        </span>
      </div>
      <div className='flex h-full items-start'>
        {chat.last_message_time && (
          <ReactTimeAgo
            className='text-xs text-gray-400'
            date={chat.last_message_time}
            locale='en'
            timeStyle='twitter'
          />
        )}
      </div>
    </div>
  );
};

export default DialogItem;
