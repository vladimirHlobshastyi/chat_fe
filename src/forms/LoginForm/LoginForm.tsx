import { useForm } from 'react-hook-form';
import { LoginFormDate, LoginFormProps } from './LoginForm.types';
import { validators } from './LoginForm.data';
import { H3, Span } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import Button from '@/components/Button';

const LoginForm = ({ errorMessage, onSubmit, onSignIn }: LoginFormProps) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='border border-gray-100 bg-background rounded-lg shadow-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Log in</H3>
      </div>

      <div className='w-full flex flex-col gap-y-6 p-6'>
        <InputField
          placeholder='Enter email...'
          label='Email'
          error={!!errors?.email}
          helperText={errors.email?.message}
          id='email'
          {...register('email', validators.email)}
        />

        <InputField
          placeholder='Enter password...'
          label='Password'
          error={!!errors?.password}
          helperText={errors.password?.message}
          id='password'
          type='password'
          {...register('password', validators.password)}
        />

        {errorMessage && <span className='error-text'>{errorMessage}</span>}

        <Button fullScreen disabled={!isDirty} type='submit'>
          Log In
        </Button>
        <div className='w-full'>
          <Span className='mr-1 text-sm text-gray-500'>Not registered?</Span>
          <button
            className='inline-block text-primary cursor-pointer'
            onClick={onSignIn}
          >
            Create an account.
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
