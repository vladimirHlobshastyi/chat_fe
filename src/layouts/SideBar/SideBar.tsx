import { Span } from '@/components/Typography/Typography.component';
import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router';
import { MENU_ITEMS } from './SideBar.data';
import { cn } from '@/utils/styles';
import Avatar from '@/components/Avatar';
import Icon from '@/components/Icon';
import { useTotalUnreadQuery } from '@/api/chats/hooks';
import MessageCounter from '@/components/MessageCounter';
import { IconNamesType } from '@/components/Icon/Icon.types';
import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';

const SideBar = ({
  variant,
  isHidden,
  className,
  setIsHidden,
}: {
  variant: RequiredRole;
  isHidden: boolean;
  className?: string;
  setIsHidden: () => void;
  //TODO will move types
}) => {
  const matchRoute = useMatchRoute();
  const { data: totalUnreadMessages } = useTotalUnreadQuery();
  const navigate = useNavigate();

  const menuItems = MENU_ITEMS[variant];

  return (
    <div
      className={cn(
        'flex flex-col z-30 h-full border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
        'fixed top-[77px] left-0 md:relative md:top-0 md:left-0',
        isHidden
          ? 'translate-x-[-100%] md:translate-x-0 md:w-24'
          : 'translate-x-0 md:w-60',
        className,
      )}
    >
      <div
        className={cn(
          'hidden md:flex items-center gap-4 cursor-pointer py-4 px-6',
        )}
        onClick={() => navigate({ to: `/${variant}` })}
      >
        <Avatar size='md' src='/flyChat.svg' alt='FlyChat' initials='FC' />
        <Span className={cn('truncate max-w-28', isHidden && 'md:hidden')}>
          FlyChat
        </Span>
      </div>

      <nav className='w-full h-full flex flex-col gap-4 p-5 overflow-auto'>
        {menuItems.map(({ iconName, title, path }) => {
          const isActive = !!matchRoute({ to: path, fuzzy: true });

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'relative px-2 py-3 rounded-lg text-sm flex gap-2.5 items-center',
                isActive ? 'bg-blue-50 text-primary' : 'hover:bg-gray-150',
                isHidden && 'md:justify-center gap-0',
              )}
              onClick={setIsHidden}
            >
              <Icon
                name={iconName as IconNamesType}
                className={cn(
                  'w-6 h-6 flex-none',
                  isActive ? 'text-primary' : 'text-text-icon',
                )}
              />

              <Span
                weight='medium'
                className={cn(
                  'whitespace-nowrap flex-1',
                  isActive ? 'text-primary' : 'text-text-secondary',
                  isHidden && 'md:hidden',
                )}
              >
                {title}
              </Span>

              {(path === '/user/dialogs' || path === '/admin/dialogs') &&
                !!totalUnreadMessages && (
                  <MessageCounter
                    className={cn(
                      'ml-auto',
                      isHidden && 'md:absolute md:top-1 md:right-1',
                    )}
                    value={totalUnreadMessages}
                  />
                )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
