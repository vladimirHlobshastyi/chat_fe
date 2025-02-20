import { useForm } from 'react-hook-form';
import { EditUserFormData, EditUserFormProps } from './EditUserForm.types';
import { validators } from './EditUserForm.data';

const EditUserForm = ({
  currentUser,
  onSubmit,
  errorMessage,
  onClose,
}: EditUserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: currentUser.name,
      role: currentUser.role,
      telegramId: currentUser.telegramId,
      geo: currentUser.geo,
      about: currentUser.about,
      isVerified: currentUser.isVerified,
      isBanned: currentUser.isBanned,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='overflow-hidden py-6'>
      <h3 className='formTitle'>Edit User</h3>

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
          <label htmlFor='role' className='text-sm font-medium'>
            Role
          </label>
          <select className='styledInput' id='role' {...register('role')}>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='telegramId' className='text-sm font-medium'>
            Telegram ID
          </label>
          <input
            className='styledInput'
            id='telegramId'
            {...register('telegramId')}
          />
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='geo' className='text-sm font-medium'>
            Geo
          </label>
          <input
            className='styledInput'
            id='geo'
            {...register('geo', validators.geo)}
          />
          {errors.geo && (
            <span className='errorText'>{errors.geo.message}</span>
          )}
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='about' className='text-sm font-medium'>
            About
          </label>
          <textarea
            className='styledInput min-h-[100px]'
            id='about'
            {...register('about')}
          />
        </div>

        <div className='w-full flex gap-4'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' {...register('isVerified')} />
            <span className='text-sm font-medium'>Verified</span>
          </label>

          <label className='flex items-center gap-2'>
            <input type='checkbox' {...register('isBanned')} />
            <span className='text-sm font-medium'>Banned</span>
          </label>
        </div>

        {errorMessage && <span className='errorText'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 px-6'>
        <button className='px-4' onClick={onClose}>
          Close
        </button>

        <button className='px-4' disabled={!isDirty} type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
