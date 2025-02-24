import { useForm } from 'react-hook-form';
import { EditGiftFormData, EditGiftFormProps } from './EditGiftForm.types';
import { validators } from './EditGiftForm.data';
import { cn } from '@/utils/styles';
import { useEffect } from 'react';

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
    <form onSubmit={handleSubmit(onSubmit)} className='overflow-hidden py-6'>
      <h3 className='formTitle'>Edit {initialProps.name} Gift</h3>

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
          <label htmlFor='geo' className='text-sm font-medium'>
            Geo
          </label>
          <select className='styledInput' id='geo' {...register('geo')}>
            <option value={'ua'}>Ukraine</option>
            <option value='fr'>France</option>
            {/* TODO Will change */}
          </select>
        </div>

        <div className='w-full flex flex-col gap-1'>
          <label htmlFor='price' className='text-sm font-medium'>
            Price
          </label>
          <input
            type='number'
            className='styledInput'
            id='price'
            {...register('price', validators.price)}
          />
          {errors.price && (
            <span className='errorText'>{errors.price.message}</span>
          )}
        </div>

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
            <span className='text-gray-500 min-h-36 flex justify-center items-center'>
              Upload Gift image
            </span>
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
          />
          {errors.image && (
            <span className='errorText'>{errors.image.message}</span>
          )}
        </div>

        <div className='flex items-center gap-2'>
          <input type='checkbox' {...register('isActive')} />
          <span className='text-sm font-medium'>Active</span>
        </div>

        {errorMessage && <span className='errorText'>{errorMessage}</span>}
      </div>

      <div className='flex w-full justify-end gap-2 px-6'>
        <button className='px-4' onClick={onClose}>
          Close
        </button>

        <button className='px-4' disabled={!isDirty} type='submit'>
          Edit Gift
        </button>
      </div>
    </form>
  );
};

export default EditGiftForm;
