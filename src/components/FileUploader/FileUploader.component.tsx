import { cn } from '@/utils/styles';
import { FileUploaderProps } from './FileUploader.types';

const FileUploader = ({
  label,
  className,
  accept,
  id,
  ...rest
}: FileUploaderProps) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      {label && (
        <label htmlFor={id} className='input-label-base'>
          {label}
        </label>
      )}
      <input
        type='file'
        id={id}
        accept={accept}
        className={cn(
          'w-full border border-neutral-300 rounded-lg focus:border-border-focus focus:outline-none focus:ring focus:ring-ring',
          className,
        )}
        {...rest}
      />
    </div>
  );
};

export default FileUploader;
