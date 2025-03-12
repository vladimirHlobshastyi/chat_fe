import { H1, Span } from '@/components/Typography/Typography.component';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { MENU_ITEMS } from './AdminSidebar.data';
import { cn } from '@/utils/styles';

const AdminSidebar = () => {
  const matchRoute = useMatchRoute();

  return (
    <div className='min-w-60 h-full flex flex-col border-r border-gray-200'>
      <div className='py-6 px-4'>
        <H1 weight='bold'>Admin Menu</H1>
      </div>
      <nav className='w-full h-full flex flex-col gap-4 p-5 overflow-auto'>
        {MENU_ITEMS.map(({ title, path }) => {
          const isActive = !!matchRoute({ to: path });

          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'px-2 py-3 rounded-lg text-sm flex items-center',
                isActive ? 'bg-blue-50 text-primary' : 'hover:bg-gray-150',
              )}
            >
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
