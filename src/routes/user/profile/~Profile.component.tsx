import { useUpdateUserMutation } from '@/api/users/hooks';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import ErrorPage from '@/components/ErrorPage';
import Loader from '@/components/Loader';
import { H3 } from '@/components/Typography/Typography.component';
import { getInitials } from '@/utils/typography';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMyProfileQuery } from '@/api/me/hooks';
import EditMyProfileModal from '@/features/Admin/Admins/EditMyProfileModal';
import { EditAdminData } from '@/routes/admin/admins/~Admins.types';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const queryClient = useQueryClient();

  const myProfileQuery = useMyProfileQuery();
  const updateAdmin = useUpdateUserMutation();

  const myProfile = myProfileQuery?.data?.data;

  const handleUpdateAdmin = (data: EditAdminData) => {
    //TODO will change admin on Users
    if (myProfile?.id) {
      updateAdmin.mutate(
        { id: myProfile.id, data },
        {
          onSuccess: () => {
            setErrorMessage('');
            setIsEditModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ['myProfile'] });
          },
          onError: () =>
            setErrorMessage('Сan`t update the admin, try again later'),
        },
      );
    }
  };

  const { error, isLoading } = useMyProfileQuery();

  if (error)
    return (
      <ErrorPage label='Error loading your profile, please try again later...' />
    );
  if (isLoading) return <Loader />;

  return (
    <div className='w-full h-full p-4 bg-gray-50 overflow-hidden'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Profile</H3>
        </div>

        <div className='w-full h-full overflow-auto p-6'>
          {myProfile && (
            <>
              <div className='p-6 mb-6 border border-gray-200 rounded-2xl '>
                <div className='flex gap-5'>
                  <div className='flex items-center w-full gap-6'>
                    <div className='w-20 h-20 border border-gray-200 rounded-full'>
                      <Avatar
                        src={myProfile.avatar}
                        initials={getInitials(myProfile.name)}
                        size='xl'
                      />
                    </div>
                    <div className='order-3'>
                      <h4 className='mb-2 text-lg font-semibold text-center text-gray-800'>
                        {myProfile.name}
                      </h4>
                      <p className='text-sm text-gray-500'>User</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditModalOpen(true)}
                    color='secondary'
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className='p-6 mb-6 border border-gray-200 rounded-2xl'>
                <div className='w-1/2'>
                  <h4 className='text-lg font-semibold text-gray-800 lg:mb-6 whitespace-nowrap mb-2 md:mb-0'>
                    Personal Information
                  </h4>
                  <div className='grid grid-cols-2 gap-7'>
                    <div>
                      <p className='mb-2 text-xs leading-normal text-gray-500'>
                        Name
                      </p>
                      <p className='text-sm font-medium text-gray-800'>
                        {myProfile.name}
                      </p>
                    </div>

                    <div>
                      <p className='mb-2 text-xs leading-normal text-gray-500'>
                        User ID
                      </p>
                      <p className='text-sm font-medium text-gray-800'>
                        {myProfile.id}
                      </p>
                    </div>

                    <div>
                      <p className='mb-2 text-xs leading-normal text-gray-500'>
                        Email address
                      </p>
                      <p className='text-sm font-medium text-gray-800'>
                        {myProfile.email || 'example@gmail.com'}{' '}
                        {/* TODO will change */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isEditModalOpen && myProfile && (
        <EditMyProfileModal
          isOpen={isEditModalOpen}
          data={{ name: myProfile.name, avatar: myProfile.avatar }}
          errorMessage={errorMessage}
          onSubmit={handleUpdateAdmin}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
