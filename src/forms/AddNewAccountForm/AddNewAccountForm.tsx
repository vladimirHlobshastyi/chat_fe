import { Controller, useForm } from 'react-hook-form';
import {
  AddNewAccountFormData,
  AddNewAccountFormProps,
} from './AddNewAccountForm.types';
import { validators } from './AddNewAccountForm.data';
import { H3 } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import Select from '@/components/Select';
import Button from '@/components/Button';
import TextArea from '@/components/Inputs/TextArea';
import { COUNTRIES_OPTIONS } from '@/common/options';

const AddNewAccountForm = ({
  onClose,
  onSubmit,
  errorMessage,
}: AddNewAccountFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<AddNewAccountFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      geo: '',
      isBanned: false,
      about: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border bg-white border-gray-100 rounded-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Create your Account</H3>
      </div>

      <div className='w-full flex flex-col gap-y-6 px-6 pt-6 overflow-auto'>
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
          type='password'
          {...register('password', validators.password)}
        />

        <InputField
          placeholder='Enter name...'
          label='Name'
          error={!!errors?.name}
          helperText={errors.name?.message}
          id='name'
          {...register('name', validators.name)}
        />

        <Controller
          name='geo'
          control={control}
          render={({ field }) => (
            <Select
              errorMessage={errors.geo?.message}
              selectedValue={field.value}
              options={COUNTRIES_OPTIONS}
              onChange={(value) => field.onChange(value)}
              label='Geo'
            />
          )}
          rules={validators.geo}
        />

        <TextArea
          placeholder='Enter about...'
          label='About'
          error={!!errors?.about}
          helperText={errors.about?.message}
          id='about'
          {...register('about')}
        />

        {errorMessage && <span className='error-text'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 p-6'>
        <Button color='secondary' onClick={onClose}>
          Close
        </Button>

        <Button disabled={!isDirty} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddNewAccountForm;
