import { useChatsQuery } from '@/api/chats/hooks';
import InputField from '@/components/Inputs/InputField';
import { H1 } from '@/components/Typography/Typography.component';
import { Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import DialogItem from './DialogItem/DialogItem';
import Icon from '@/components/Icon';
import { cn } from '@/utils/styles';

const DialogsLayout = ({ role }: { role: 'admin' | 'user' }) => {
  //TODO WILL move roll to the local storage
  const [searchChat, setSearchChat] = useState(''); //TODO will add debounce
  const [isDialogsHidden, setIsDialogsHidden] = useState(false);

  const { data: chats = [] } = useChatsQuery({ search: searchChat });

  return (
    <div className='p-4 w-full h-full gap-4 flex flex-col overflow-hidden md:flex-row'>
      <div
        className={cn(
          'w-full p-4 flex flex-col border bg-white border-gray-200 rounded-xl md:max-w-72 h-full',
          isDialogsHidden && 'h-auto',
        )}
      >
        <H1 className='text-2xl'>Chats</H1>
        <div className='my-4 flex gap-3'>
          <button
            className='flex h-10 w-10 justify-center items-center rounded-lg border border-gray-300 md:hidden'
            onClick={() => setIsDialogsHidden(!isDialogsHidden)}
          >
            <Icon name='StraightLinesIcons' className='text-text-icon' />
            {/* TODO will move to the component */}
          </button>

          <InputField
            placeholder='Search...'
            value={searchChat}
            onChange={(e) => setSearchChat(e.currentTarget.value)}
          />
        </div>

        <div className='flex flex-col gap-3 overflow-auto'>
          {chats.map((chat) => (
            <DialogItem
              role={role}
              key={chat.partner_id}
              chat={chat}
              onSelect={() => setIsDialogsHidden(true)}
              className={cn(isDialogsHidden && 'hidden md:flex')}
            />
          ))}
        </div>
      </div>
      {isDialogsHidden && <Outlet />}
    </div>
  );
};

export default DialogsLayout;
