import { useForm } from 'react-hook-form';
import { LoginFormDate, LoginFormProps } from './LoginForm.types';
import { validators } from './LoginForm.data';

const LoginForm = ({ errorMessage, onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<LoginFormDate>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className='text-xl font-semibold mb-2'>Log in</h3>

      <div className='w-full flex flex-col gap-1'>
        <label htmlFor='username' className='text-sm font-medium'>
          Username
        </label>
        <input
          className='styledInput'
          id='username'
          {...register('username', validators.username)}
        />
        {errors.username && (
          <span className='text-error text-sm'>{errors.username.message}</span>
        )}
      </div>

      <div className='w-full flex flex-col gap-1'>
        <label htmlFor='password' className='text-sm font-medium'>
          Password
        </label>
        <input
          id='password'
          className='styledInput'
          type='password'
          {...register('password', validators.password)}
        />
        {errors.password && (
          <span className='text-error text-sm'>{errors.password.message}</span>
        )}
      </div>

      {errorMessage && <span className='text-error'>{errorMessage}</span>}

      <button disabled={!isDirty} className='mt-3' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
