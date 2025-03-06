import { Controller, useForm } from 'react-hook-form';
import { EditGiftFormData, EditGiftFormProps } from './EditGiftForm.types';
import { validators } from './EditGiftForm.data';
import { cn } from '@/utils/styles';
import { useEffect } from 'react';
import { H3, Span } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import MultiSelect from '@/components/MultiSelect';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import { MOCK_GEO_OPTIONS } from '@/common/MOCK';

const EditGiftForm = ({
  errorMessage,
  initialProps,
  giftUrl,
  onClose,
  onSubmit,
}: EditGiftFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    control,
    formState: { isDirty, errors },
  } = useForm<EditGiftFormData>({
    defaultValues: initialProps,
  });

  const { image } = watch();

  const imageFile = image?.[0] instanceof File ? image[0] : null;
  const imageFileUrl = imageFile ? URL.createObjectURL(imageFile) : giftUrl;

  useEffect(() => {
    resetField('image');
  }, [giftUrl]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border-border border-gray-100'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Add new Gift</H3>
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

        <Controller
          name='geo'
          control={control}
          render={({ field }) => (
            <MultiSelect
              selectedValues={field.value}
              options={MOCK_GEO_OPTIONS}
              onChange={(value) => field.onChange(value)}
              label='Geo'
            />
          )}
        />

        <InputField
          type='number'
          placeholder='Enter price...'
          label='Price'
          error={!!errors?.price}
          helperText={errors.price?.message}
          id='price'
          {...register('price', validators.price)}
        />

        <div
          className={cn(
            'flex justify-center items-center h-36 w-full rounded-lg bg-gray-200',
            errors.image ? 'border border-red-500' : '',
          )}
        >
          {imageFileUrl ? (
            <img
              className='w-full h-full object-contain'
              src={imageFileUrl}
              alt='Gift'
            />
          ) : (
            <Span className='text-gray-500 min-h-36 flex justify-center items-center'>
              Upload Gift image
            </Span>
          )}
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='image' className='text-sm font-medium'>
            Image
          </label>
          <input
            accept='image/svg+xml, image/png, image/jpeg, image/gif, image/webp'
            type='file'
            className='styledInput'
            id='image'
            {...register('image')}
          />{' '}
          {/* TODO// Will change this upload input */}
          {errors.image && (
            <Span className='errorText'>{errors.image.message}</Span>
          )}
        </div>

        <Controller
          name='isActive'
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={(value) => field.onChange(value)}
              label='Active'
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
          Add Gift
        </Button>
      </div>
    </form>
  );
};

export default EditGiftForm;
