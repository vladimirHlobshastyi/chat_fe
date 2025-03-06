import { Controller, useForm } from 'react-hook-form';
import { AddAdminFormData, AddAdminFormProps } from './AddAdminForm.types';
import { validators } from './AddAdminForm.data';
import Checkbox from '@/components/Checkbox';
import InputField from '@/components/Inputs/InputField';
import { H3 } from '@/components/Typography/Typography.component';
import Button from '@/components/Button';

const AddAdminForm = ({
  onClose,
  onSubmit,
  errorMessage,
}: AddAdminFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<AddAdminFormData>({
    defaultValues: {
      name: '',
      email: '',
      isVerified: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border-border border-gray-100'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Add new Admin</H3>
      </div>

      <div className='w-full flex flex-col gap-6 p-6 max-h-[60vh] overflow-auto'>
        <InputField
          placeholder='Enter name...'
          label='Name'
          error={!!errors?.name}
          helperText={errors.name?.message}
          id='name'
          {...register('name', validators.name)}
        />

        <InputField
          placeholder='Enter email...'
          label='Email'
          type='email'
          error={!!errors?.email}
          helperText={errors.email?.message}
          id='email'
          {...register('email', validators.email)}
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

        {errorMessage && <span className='errorText'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 px-6 pb-6'>
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
