import { Span } from '@/components/Typography/Typography.component';
import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router';
import { MENU_ITEMS } from './AdminSidebar.data';
import { cn } from '@/utils/styles';
import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { useMyProfileQuery } from '@/api/me/hooks';
import { useState, useRef, RefObject } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useLogOutMutation } from '@/api/auth/hooks';
import Icon from '@/components/Icon';

const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const myProfileQuery = useMyProfileQuery();
  const logOutMutation = useLogOutMutation();

  const handleLogout = () => {
    logOutMutation.mutate();
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
    <div className='min-w-60 h-full flex flex-col border-r border-gray-200'>
      <div className='relative min-h-[88px]' ref={dropdownRef}>
        <div
          className='py-6 px-4 flex h-full items-center gap-4 border-b cursor-pointer'
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

        {isDropdownOpen && (
          <div className='absolute top-full left-0 w-full z-10 bg-white border-border rounded-b-lg shadow-lg'>
            <div className='p-3 flex flex-col w-full'>
              <div>
                <span className='block text-sm font-medium text-gray-700'>
                  {myProfile?.name}
                </span>
                <span className='mt-0.5 block text-xs text-gray-500'>
                  johndoe@example.com
                  {/*  {myProfile?.email} TODO will change */}
                </span>
              </div>

              <ul className='flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4'>
                <div
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                  onClick={() => {
                    navigate({ to: '/admin/profile' });
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

      <nav className='w-full h-full flex flex-col gap-4 p-5 overflow-auto'>
        {MENU_ITEMS.map(({ icon, title, path }) => {
          const isActive = !!matchRoute({ to: path });

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'px-2 py-3 rounded-lg text-sm flex gap-2.5 items-center',
                isActive ? 'bg-blue-50 text-primary' : 'hover:bg-gray-150',
              )}
            >
              {icon && icon}
              <Span
                weight='medium'
                className={cn(
                  isActive ? 'text-primary' : 'text-text-secondary',
                )}
              >
                {title}
              </Span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
