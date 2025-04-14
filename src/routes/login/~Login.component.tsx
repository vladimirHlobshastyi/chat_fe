import { useLoginMutation } from '@/api/auth/hooks';
import { LoginQueryType } from '@/api/auth/types';
import { useCreateUserMutation } from '@/api/users/hooks';
import { CreateUserParams } from '@/api/users/types';
import AddNewAccountForm from '@/forms/AddNewAccountForm';
import LoginForm from '@/forms/LoginForm';
import { useState } from 'react';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [addNewUserError, setAddNewUserError] = useState<string | undefined>();

  const [isAddNewUserOpen, setIsAddNewUserOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const loginMutation = useLoginMutation();
  const createUser = useCreateUserMutation();

  const onSubmit = (data: LoginQueryType['Params']) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        setErrorMessage(error.message);
        console.error(error);
      },
    });
  };

  const handleOnSignIn = () => {
    setIsLoginForm(false);
    setIsAddNewUserOpen(true);
  };

  const handleCloseAddUser = () => {
    setIsLoginForm(true);
    setIsAddNewUserOpen(false);
  };

  const handleCreateUser = (data: CreateUserParams) => {
    createUser.mutate(
      { ...data, role: 'user' },
      {
        onSuccess: () => {
          setAddNewUserError(undefined);
          onSubmit({ email: data.email, password: data.password });
        },
        onError: () =>
          setAddNewUserError('Сan`t create a user, try again later'),
      },
    );
  };

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
      <div className='p-4 w-full md:p-0 md:max-w-[400px]'>
        {isLoginForm && (
          <LoginForm
            onSignIn={handleOnSignIn}
            errorMessage={errorMessage}
            onSubmit={onSubmit}
          />
        )}

        {isAddNewUserOpen && (
          <AddNewAccountForm
            errorMessage={addNewUserError}
            onSubmit={handleCreateUser}
            onClose={handleCloseAddUser}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
