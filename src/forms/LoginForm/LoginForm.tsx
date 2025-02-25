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
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
      <h3 className='formTitle'>Log in</h3>

      <div className='w-full flex flex-col gap-1'>
        <label htmlFor='email' className='text-sm font-medium'>
          Username
        </label>
        <input
          className='styledInput'
          id='email'
          {...register('email', validators.email)}
        />
        {errors.email && (
          <span className='errorText text-sm'>{errors.email.message}</span>
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
          <span className='errorText text-sm'>{errors.password.message}</span>
        )}
      </div>

      {errorMessage && <span className='errorText'>{errorMessage}</span>}

      <button disabled={!isDirty} className='mt-3 w-full' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
