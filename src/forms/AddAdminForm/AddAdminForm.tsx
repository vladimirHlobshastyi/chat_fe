import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AddAdminFormData, AddAdminFormProps } from './AddAdminForm.types';
import { validators } from './AddAdminForm.data';
import Checkbox from '@/components/Checkbox';
import InputField from '@/components/Inputs/InputField';
import { H3 } from '@/components/Typography/Typography.component';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { MOCK_GEO_OPTIONS } from '@/common/mock';

const AddAdminForm = ({
  onClose,
  onSubmit,
  errorMessage,
}: AddAdminFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<AddAdminFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      geo: 'ua',
      //isVerified: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border rounded-lg border-gray-100'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Add new Admin</H3>
      </div>

      <div className='w-full flex flex-col gap-y-6 px-6 pt-6 max-h-[60vh] overflow-auto'>
        <InputField
          placeholder='Enter Email...'
          label='Email'
          error={!!errors?.email}
          helperText={errors.email?.message}
          id='email'
          type='email'
          {...register('email', validators.email)}
        />

        <InputField
          placeholder='Password Email...'
          label='Password'
          error={!!errors?.password}
          helperText={errors.password?.message}
          id='password'
          type={showPassword ? 'text' : 'password'}
          {...register('password', validators.password)}
        />

        <div className='flex items-center gap-2'>
          <Checkbox
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <span
            className='cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <InputField
          placeholder='Enter name...'
          label='Name'
          error={!!errors?.name}
          helperText={errors.name?.message}
          id='name'
          {...register('name', validators.name)}
        />

        {/* TODO will Add avatar */}

        <Controller
          name='geo'
          control={control}
          render={({ field }) => (
            <Select
              selectedValue={field.value}
              options={MOCK_GEO_OPTIONS} //TODO will change
              onChange={(value) => field.onChange(value)}
              label='Geo'
            />
          )}
        />
        <Controller
          name='isVerified'
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={() => field.onChange(!field.value)}
              label='Verified'
            />
          )}
        />

        {errorMessage && <span className='error-text'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 p-6'>
        <Button color='secondary' onClick={onClose}>
          Close
        </Button>

        <Button disabled={!isDirty} type='submit'>
          Add Admin
        </Button>
      </div>
    </form>
  );
};

export default AddAdminForm;
