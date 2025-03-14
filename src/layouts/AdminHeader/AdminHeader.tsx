import { MOCK_PROFILE_DATA } from '@/common/mock';
import Avatar from '@/components/Avatar';
import { Span } from '@/components/Typography/Typography.component';
import { getInitials } from '@/utils/typography';

const AdminHeader = () => {
  const getProfile = MOCK_PROFILE_DATA;

  return (
    <div className='bg-background w-full py-4 px-6 flex justify-end items-center gap-2 border-b'>
      <Avatar alt={getProfile.name} initials={getInitials(getProfile.name)} />
      <Span>{getProfile.name}</Span>
    </div>
  );
};

export default AdminHeader;
