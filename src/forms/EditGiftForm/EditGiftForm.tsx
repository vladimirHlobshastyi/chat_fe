import { Controller, useForm } from 'react-hook-form';
import { EditGiftFormData, EditGiftFormProps } from './EditGiftForm.types';
import { validators } from './EditGiftForm.data';
import { cn } from '@/utils/styles';
import { H3, Span } from '@/components/Typography/Typography.component';
import InputField from '@/components/Inputs/InputField';
import MultiSelect from '@/components/MultiSelect';
import Checkbox from '@/components/Checkbox';
import Button from '@/components/Button';
import FileUploaderURL from '@/features/Files/FileUploaderURL';
import { COUNTRIES_OPTIONS } from '@/common/options';
import { getCountriesByCodes } from '@/utils/common';

const EditGiftForm = ({
  errorMessage,
  initialProps,
  onClose,
  onSubmit,
}: EditGiftFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { isDirty, errors },
  } = useForm<EditGiftFormData>({
    defaultValues: initialProps,
  });

  const { image } = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='overflow-hidden border border-gray-100 rounded-lg'
    >
      <div className='w-full border-b border-gray-100'>
        <H3 className='px-6 py-5'>Edit {initialProps.name} Gift</H3>
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
          name='restrictedCountries'
          control={control}
          render={({ field }) => (
            <MultiSelect
              selectedValues={getCountriesByCodes(field.value)}
              options={COUNTRIES_OPTIONS}
              onChange={(value) =>
                field.onChange(value.map((item) => item.value))
              }
              label='Restricted countries'
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
          {...register('price', { ...validators.price, valueAsNumber: true })}
        />

        <div
          className={cn(
            'flex justify-center items-center h-36 w-full rounded-lg bg-gray-100',
            errors.image ? 'border border-red-500' : '',
          )}
        >
          {image ? (
            <img
              className='w-full h-full min-h-36 object-contain'
              src={image}
              alt='Gift'
            />
          ) : (
            <Span className='text-gray-500 min-h-36 flex justify-center items-center'>
              Upload Gift image
            </Span>
          )}
        </div>

        <Controller
          name='image'
          control={control}
          render={({ field }) => (
            <FileUploaderURL
              errorMessage={errors.image?.message}
              onUploadSuccess={(value) => {
                field.onChange(value, { shouldDirty: true });
              }}
            />
          )}
        />

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

export default EditGiftForm;
