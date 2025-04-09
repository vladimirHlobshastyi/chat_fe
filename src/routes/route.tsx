import Avatar from '@/components/Avatar';
import { H1 } from '@/components/Typography/Typography.component';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div
        className='flex flex-col items-center cursor-pointer py-14 px-6 hover:rounded-full hover:border-medium hover:border-border-focus'
        onClick={() => navigate({ to: '/user', from: '/' })}
      >
        <Avatar src='/public/flyChat.svg' size='xl' alt='FlyChatLogo' />
        <H1>Welcome to the FlyChat!</H1>
      </div>
    </div>
  );
}
