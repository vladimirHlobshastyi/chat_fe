import { Controller, useForm } from 'react-hook-form';
import { AddUserFormData, AddUserFormProps } from './AddUserForm.types';
import { validators } from './AddUserForm.data';
import { H3, Span } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import Select from '@/components/Select';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import TextArea from '@/components/Inputs/TextArea';
import { COUNTRIES_OPTIONS } from '@/common/options';
import FileUploaderURL from '@/features/Files/FileUploaderURL';
import { cn } from '@/utils/styles';

const AddUserForm = ({ onClose, onSubmit, errorMessage }: AddUserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isDirty, errors },
  } = useForm<AddUserFormData>({
    defaultValues: {
      email: '',
      password: '',
      avatar: '',
      name: '',
      geo: '',
      isBanned: false,
      //isVerified: false,
      about: '',
    },
  });

  const avatar = watch('avatar');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border bg-white border-gray-100 rounded-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Add new User</H3>
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

        <div
          className={cn(
            'flex justify-center items-center h-36 w-full rounded-lg bg-gray-100',
            errors.avatar ? 'border border-red-500' : '',
          )}
        >
          {avatar ? (
            <img
              className='w-full h-full min-h-36 object-contain'
              src={avatar}
              alt='Gift'
            />
          ) : (
            <Span className='text-gray-500 min-h-36 flex justify-center items-center'>
              Upload User avatar
            </Span>
          )}
        </div>

        <Controller
          name='avatar'
          control={control}
          render={({ field }) => (
            <FileUploaderURL
              errorMessage={errors.avatar?.message}
              onUploadSuccess={(value) => {
                field.onChange(value, { shouldDirty: true });
              }}
            />
          )}
        />

        <TextArea
          placeholder='Enter about...'
          label='About'
          error={!!errors?.about}
          helperText={errors.about?.message}
          id='about'
          {...register('about')}
        />

        <div className='w-full flex gap-4'>
          {/*  <Controller
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
          Add User
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
