import LoginForm from '@/forms/LoginForm';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: () => (
    <div className='w-full h-screen flex justify-center items-center bg-neutral-200'>
      <div className='max-w-[400px] w-full'>
        <LoginForm onSubmit={(data) => console.log(data)} />
      </div>
    </div>
  ),
});
