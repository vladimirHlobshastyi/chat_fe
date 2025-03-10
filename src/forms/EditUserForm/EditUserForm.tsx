import { Controller, useForm } from 'react-hook-form';
import { EditUserFormData, EditUserFormProps } from './EditUserForm.types';
import { validators } from './EditUserForm.data';
import { H3 } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import Select from '@/components/Select';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { MOCK_GEO_OPTIONS } from '@/common/mock';
import TextArea from '@/components/Inputs/TextArea';
import { USER_ROLE_OPTIONS } from '@/common/options';

const EditUserForm = ({
  currentUser,
  onSubmit,
  errorMessage,
  onClose,
}: EditUserFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, errors },
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: currentUser.name,
      role: currentUser.role,
      //telegramId: currentUser.telegramId,
      geo: currentUser.geo,
      about: currentUser.about,
      //isVerified: currentUser.isVerified,
      isBanned: currentUser.isBanned,
      //TODO Add AVATAR
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border border-gray-100 rounded-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Edit User</H3>
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

        <Controller
          name='role'
          control={control}
          render={({ field }) => (
            <Select
              selectedValue={field.value}
              options={USER_ROLE_OPTIONS}
              onChange={(value) => field.onChange(value)}
              label='Role'
            />
          )}
        />

        {/*  <InputField
          placeholder='Enter telegram Id...'
          label='Telegram Id'
          error={!!errors?.telegramId}
          helperText={errors.telegramId?.message}
          id='telegramId'
          {...register('telegramId')}
        /> */}

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
        {errorMessage && <span className='errorText'>{errorMessage}</span>}
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

export default EditUserForm;
