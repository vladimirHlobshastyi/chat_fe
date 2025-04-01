import { useChatsQuery } from '@/api/chats/hooks';
import InputField from '@/components/Inputs/InputField';
import { H1 } from '@/components/Typography/Typography.component';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import DialogItem from './DialogItem/DialogItem';

const DialogsLayout = () => {
  const [searchChat, setSearchChat] = useState(''); //TODO will add debounce
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
            <DialogItem key={chat.partner_id} chat={chat} />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DialogsLayout;
