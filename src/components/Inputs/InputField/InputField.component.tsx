import { cn } from '@/utils/styles';
import { InputFieldProps } from './InputField.types';
import { Span } from '@/components/Typography/Typography.component';

const InputField = ({
  label,
  success,
  error,
  className,
  helperText,
  disabled,
  ...rest
}: InputFieldProps) => {
  const isSuccess = success && !error;
  const isError = error && !disabled;

  return (
    <div className='w-full'>
      {label && (
        <Span
          className={cn(
            'input-label-base',
            disabled ? 'text-text-disabled' : 'text-text',
          )}
        >
          {label}
        </Span>
      )}
      <input
        type='text'
        className={cn(
          'input-base',
          isError && 'input-error',
          isSuccess && 'input-success',
          disabled && 'input-disabled',
          className,
        )}
        disabled={disabled}
        {...rest}
      />
      {helperText && (
        <p
          className={cn(
            'mt-1.5 text-xs',
            disabled && 'text-text-disabled',
            isSuccess && 'text-text-success',
            isError && 'text-text-error',
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
