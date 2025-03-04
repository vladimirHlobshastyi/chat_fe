import { useForm } from 'react-hook-form';
import { LoginFormDate, LoginFormProps } from './LoginForm.types';
import { validators } from './LoginForm.data';
import { H3 } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import Button from '@/components/Button';

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
    <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-100'>
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-5 py-6'>Log in</H3>
      </div>

      <div className='w-full flex flex-col gap-6 p-6'>
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

        {errorMessage && <span className='errorText'>{errorMessage}</span>}

        <Button className='w-full' disabled={!isDirty} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
