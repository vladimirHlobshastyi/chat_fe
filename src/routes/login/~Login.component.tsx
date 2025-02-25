import { useLoginMutation } from '@/api/auth/hooks';
import { LoginQueryType } from '@/api/auth/types';
import LoginForm from '@/forms/LoginForm';
import { useNavigate } from '@tanstack/react-router';

const Login = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate({ from: '/login' });

  const onSubmit = (data: LoginQueryType['Params']) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate({ to: '/admin/users' });
      },
    });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-neutral-200'>
      <div className='max-w-[400px] w-full'>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Login;
