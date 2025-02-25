import { useForm } from 'react-hook-form';
import { AddAdminFormData, AddAdminFormProps } from './AddAdminForm.types';
import { validators } from './AddAdminForm.data';

const AddAdminForm = ({
  onClose,
  onSubmit,
  errorMessage,
}: AddAdminFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<AddAdminFormData>({
    defaultValues: {
      name: '',
      email: '',
      isVerified: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='overflow-hidden py-6'>
      <h3 className='formTitle'>Add new Admin</h3>

      <div className='w-full flex flex-col gap-4 max-h-[60vh] overflow-auto px-6'>
        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='name' className='text-sm font-medium'>
            Name
          </label>
          <input
            className='styledInput'
            id='name'
            {...register('name', validators.name)}
          />
          {errors.name && (
            <span className='errorText'>{errors.name.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='email' className='text-sm font-medium'>
            Email
          </label>
          <input
            className='styledInput'
            id='email'
            type='email'
            {...register('email', validators.email)}
          />
          {errors.email && (
            <span className='errorText'>{errors.email.message}</span>
          )}
        </div>

        <label className='flex items-center gap-2'>
          <input type='checkbox' {...register('isVerified')} />
          <span className='text-sm font-medium'>Verified</span>
        </label>

        {errorMessage && <span className='errorText'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 px-6'>
        <button className='px-4' onClick={onClose}>
          Close
        </button>

        <button className='px-4' disabled={!isDirty} type='submit'>
          Add Admin
        </button>
      </div>
    </form>
  );
};

export default AddAdminForm;
