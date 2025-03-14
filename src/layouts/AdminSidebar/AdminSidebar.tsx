import { Span } from '@/components/Typography/Typography.component';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { MENU_ITEMS } from './AdminSidebar.data';
import { cn } from '@/utils/styles';
import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { useMyProfileQuery } from '@/api/me/hooks';
import EditAdminModal from '@/features/Admin/Admins/EditAdminModal';
import { useState, useRef, RefObject } from 'react';
import { useUpdateUserMutation } from '@/api/users/hooks';
import type { EditAdminData } from '@/routes/admin/admins/~Admins.types';
import { useQueryClient } from '@tanstack/react-query';
import useOutsideClick from '@/hooks/useOutsideClick';

const AdminSidebar = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const matchRoute = useMatchRoute();
  const queryClient = useQueryClient();

  const myProfileQuery = useMyProfileQuery();
  const myProfile = myProfileQuery?.data?.data;

  const updateAdmin = useUpdateUserMutation();

  useOutsideClick(dropdownRef as RefObject<HTMLDivElement>, () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  });

  const handleUpdateAdmin = (data: EditAdminData) => {
    if (myProfile?.id) {
      updateAdmin.mutate(
        { id: myProfile.id, data },
        {
          onSuccess: () => {
            setErrorMessage('');
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });
            setIsEditModalOpen(false);
          },
          onError: () =>
            setErrorMessage('Сan`t update the admin, try again later'),
        },
      );
    }
  };

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
              <Span>{myProfile.name}</Span>
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
          <div className='absolute top-full left-0 w-full z-10 bg-white border border-gray-200 rounded-b-lg shadow-lg'>
            <div className='p-3 flex flex-col w-full'>
              <div>
                <span className='block text-sm font-medium text-gray-700'>
                  {myProfile?.name}
                </span>
                <span className='mt-0.5 block text-xs text-gray-500'>
                  johndoe@example.com
                  {/*               {myProfile?.email} TODO will change
                   */}{' '}
                </span>
              </div>

              <ul className='flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4'>
                <div
                  className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  <svg
                    className='fill-gray-500 group-hover:fill-gray-700'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z'
                      fill=''
                    ></path>
                  </svg>
                  <span>Edit profile</span>
                </div>
              </ul>
              <div className='group mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 cursor-pointer'>
                <svg
                  className='fill-gray-500 group-hover:fill-gray-700'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z'
                    fill=''
                  ></path>
                </svg>
                Sign out
              </div>
            </div>
          </div>
        )}
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
      {isEditModalOpen && myProfile && (
        <EditAdminModal
          isOpen={isEditModalOpen}
          currentAdmin={{ ...myProfile, email: 'mock@gmail.com' }}
          errorMessage={errorMessage}
          onSubmit={handleUpdateAdmin}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminSidebar;
