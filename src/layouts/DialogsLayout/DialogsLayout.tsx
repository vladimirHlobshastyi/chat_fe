import { useChatsQuery } from '@/api/chats/hooks';
import Avatar from '@/components/Avatar';
import InputField from '@/components/Inputs/InputField';
import { H1 } from '@/components/Typography/Typography.component';
import { getInitials } from '@/utils/typography';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import ReactTimeAgo from 'react-time-ago';

const DialogsLayout = () => {
  const [searchChat, setSearchChat] = useState(''); //TODO will add debounce
  const navigate = useNavigate();
  const { data: chats = [] } = useChatsQuery({ search: searchChat });
  return (
    <div className='p-4 w-full h-full flex'>
      <div className='max-w-72 w-full h-full p-4 flex flex-col border bg-white border-gray-200 rounded-xl'>
        <H1 className='text-2xl'>Chats</H1>
        <InputField
          className='my-4'
          placeholder='Search...'
          value={searchChat}
          onChange={(e) => setSearchChat(e.currentTarget.value)}
        />
        <div className='flex flex-col gap-3 overflow-auto'>
          {chats.map((chat) => (
            <div
              key={chat.partner_id}
              className='flex items-center gap-3 cursor-pointer hover:bg-gray-150 rounded-xl p-3'
              onClick={() => {
                navigate({ to: `/admin/dialogs/${chat.partner_id}` });
              }}
            >
              <Avatar
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
                <ReactTimeAgo
                  className='text-xs text-gray-400'
                  date={chat.last_message_time}
                  locale='en'
                  timeStyle='twitter'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DialogsLayout;
