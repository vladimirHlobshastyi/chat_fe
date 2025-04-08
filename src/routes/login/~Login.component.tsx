import { useLoginMutation } from '@/api/auth/hooks';
import { LoginQueryType } from '@/api/auth/types';
import LoginForm from '@/forms/LoginForm';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const loginMutation = useLoginMutation();
  const navigate = useNavigate({ from: '/login' });

  const onSubmit = (data: LoginQueryType['Params']) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate({ to: '/admin' });
      },
      onError: (error) => {
        setErrorMessage(error.message);
        console.error(error);
      },
    });
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
      <div className='max-w-[400px] w-full'>
        <LoginForm errorMessage={errorMessage} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default Login;
