import Avatar from '@/components/Avatar';
import { Span } from '@/components/Typography/Typography.component';
import { getInitials } from '@/utils/typography';
import { useNavigate } from '@tanstack/react-router';
import { cn } from '@/utils/styles';
import { useMyProfileQuery } from '@/api/me/hooks';
import { useState, useRef, RefObject } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useLogOutMutation } from '@/api/auth/hooks';
import Icon from '@/components/Icon';
import { useQueryClient } from '@tanstack/react-query';
import { HeaderTypes } from './Header.types';
import MessageCounter from '@/components/MessageCounter';
import { useTotalUnreadQuery } from '@/api/chats/hooks';

const Header = ({
  isHidden,
  role,
  className,
  onHide,
  onMobHeaderHide,
}: HeaderTypes) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const myProfileQuery = useMyProfileQuery();
  const logOutMutation = useLogOutMutation();
  const queryClient = useQueryClient();
  const { data: totalUnreadMessages } = useTotalUnreadQuery();

  const handleLogout = () => {
    logOutMutation.mutate();
    queryClient.clear();
  };

  const myProfile = myProfileQuery?.data?.data;

  useOutsideClick(dropdownRef as RefObject<HTMLDivElement>, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        'bg-background w-full py-4 px-6 flex justify-between items-center gap-2 border-b',
        className,
      )}
    >
      <button
        className='relative flex h-10 w-10 justify-center items-center rounded-lg border  border-gray-200'
        onClick={() => onHide(!isHidden)}
      >
        <Icon
          width={16}
          height={12}
          viewBox='0 0 16 12'
          name='RowsIcon'
          fill='text-text-icon'
        />

        {!!totalUnreadMessages && (
          <MessageCounter
            className='absolute -top-1 -right-2 md:hidden'
            value={totalUnreadMessages}
          />
        )}
        {/* TODO will move to the component */}
      </button>

      <div
        className={cn('flex md:hidden items-center gap-1 cursor-pointer')}
        onClick={() => navigate({ to: `/${role}` })}
      >
        <Avatar size='md' src='/flyChat.svg' alt='FlyChat' initials='FC' />
        <Span className={cn('truncate max-w-28')}>FlyChat</Span>
      </div>

      <div className='relative' ref={dropdownRef}>
        <div
          className='hidden h-full items-center gap-4 cursor-pointer md:flex'
          onClick={toggleDropdown}
        >
          {myProfile && (
            <>
              <Avatar
                size='md'
                src={myProfile.avatar}
                alt={myProfile.name}
                initials={getInitials(myProfile.name)}
              />
              <Span className='truncate max-w-28'>{myProfile.name}</Span>
              <svg
                className={cn(
                  'h-3 w-3 ml-auto stroke-current transition-transform text-gray-500',
                  isDropdownOpen && 'rotate-180',
                )}
                width='12'
                height='12'
                viewBox='0 0 10 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1L5 5L9 1'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </>
          )}
        </div>

        <button
          className={cn(
            'flex h-10 w-10 justify-center items-center rounded-lg border border-gray-200 md:hidden',
          )}
          onClick={() => onMobHeaderHide((prev) => !prev)}
        >
          <Icon fill='text-text-icon' name='DotsIcon' />
        </button>

        {isDropdownOpen && (
          <div className='absolute top-14 -left-16 z-30 border border-gray-200 rounded-lg shadow-lg bg-white min-w-52'>
            <div className='p-3 w-full flex flex-1 flex-col'>
              <div>
                <span className='block text-sm font-medium text-gray-700'>
                  {myProfile?.name}
                </span>
                <span className='mt-0.5 block text-xs text-gray-500'>
                  {myProfile?.email}
                </span>
              </div>

              <ul className='flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4'>
                <div
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                  onClick={() => {
                    navigate({ to: `/${role}/profile` });
                    setIsDropdownOpen(false);
                  }}
                >
                  <Icon
                    name='ProfileIcon'
                    className='fill-text-icon group-hover:fill-gray-700'
                  />
                  <span>Profile</span>
                </div>
              </ul>
              <div
                className='group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                onClick={handleLogout}
              >
                <Icon
                  name='LogoutIcon'
                  className='fill-text-icon group-hover:fill-gray-700'
                />
                Log Out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
