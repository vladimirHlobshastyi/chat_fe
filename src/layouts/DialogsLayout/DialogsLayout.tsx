import { useChatsQuery } from '@/api/chats/hooks';
import InputField from '@/components/Inputs/InputField';
import { H1, Span } from '@/components/Typography/Typography.component';
import { Outlet, useMatchRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import DialogItem from './DialogItem/DialogItem';
import Icon from '@/components/Icon';
import { cn } from '@/utils/styles';
import Loader from '@/components/Loader';

const DialogsLayout = ({ role }: { role: 'admin' | 'user' }) => {
  //TODO WILL move roll to the local storage
  const [searchChat, setSearchChat] = useState(''); //TODO will add debounce
  const [isDialogsHidden, setIsDialogsHidden] = useState<boolean | null>(null);

  const { data: chats = [] } = useChatsQuery({ search: searchChat });
  const matchRoute = useMatchRoute();
  const isDialogsPage = !!matchRoute({ to: `/${role}/dialogs`, fuzzy: false });

  useEffect(() => {
    setIsDialogsHidden(isDialogsPage ? false : true);
  }, [isDialogsPage]);

  if (isDialogsHidden === null) return <Loader />;

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
            disabled={chats.length === 0}
            onChange={(e) => setSearchChat(e.currentTarget.value)}
          />
        </div>

        <div
          className={cn(
            'flex flex-col gap-3 overflow-auto transition-all duration-300 ease-in-out',
            'origin-top transform',
            isDialogsHidden
              ? 'scale-y-0 opacity-0 md:scale-y-100 md:opacity-100'
              : 'scale-y-100 opacity-100',
          )}
        >
          {chats.length > 0 ? (
            chats.map((chat) => (
              <DialogItem
                role={role}
                key={chat.partner_id}
                chat={chat}
                onSelect={() => setIsDialogsHidden(true)}
                className={cn(isDialogsHidden && 'hidden md:flex')}
              />
            ))
          ) : (
            <div className={cn('mt-2', isDialogsHidden && 'hidden')}>
              <Span>Empty chats...</Span>
            </div>
          )}
        </div>
      </div>
      {isDialogsHidden && <Outlet />}
    </div>
  );
};

export default DialogsLayout;
