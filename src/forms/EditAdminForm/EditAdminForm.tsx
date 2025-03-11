import { Controller, useForm } from 'react-hook-form';
import { EditAdminFormData, EditAdminFormProps } from './EditAdminForm.types';
import { validators } from './EditAdminForm.data';
import InputField from '@/components/Inputs/InputField';
import Checkbox from '@/components/Checkbox';
import { H3 } from '@/components/Typography/Typography.component';
import Button from '@/components/Button';

const EditAdminForm = ({
  currentAdmin,
  errorMessage,
  onSubmit,
  onClose,
}: EditAdminFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<EditAdminFormData>({
    defaultValues: {
      name: currentAdmin.name,
      email: currentAdmin.email,
      //isVerified: currentAdmin.isVerified,
      isBanned: currentAdmin.isBanned,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border border-gray-100 rounded-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Edit {currentAdmin.name} Admin</H3>
      </div>

      <div className='w-full flex flex-col gap-y-6 px-6 pt-6 max-h-[60vh] overflow-auto'>
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
          type='email'
          label='Email'
          error={!!errors?.email}
          helperText={errors.email?.message}
          id='email'
          {...register('email', validators.email)}
        />

        <div className='w-full flex gap-4'>
          {/*    <Controller
            name='isVerified'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
                label='Verified'
              />
            )}
          /> */}

          <Controller
            name='isBanned'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
                label='Banned'
              />
            )}
          />
        </div>
        {errorMessage && <span className='error-text'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 p-6'>
        <Button color='secondary' onClick={onClose}>
          Close
        </Button>

        <Button disabled={!isDirty} type='submit'>
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditAdminForm;
