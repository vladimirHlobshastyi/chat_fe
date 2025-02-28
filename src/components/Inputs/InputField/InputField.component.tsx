import { cn } from '@/utils/styles';
import { InputFieldProps } from './InputField.types';
import { forwardRef } from 'react';
import { Span } from '@/components/Typography/Typography.component';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, success, error, className, helperText, disabled, ...rest },
    ref,
  ) => {
    const isSuccess = success && !error;
    const isError = error && !disabled;

    return (
      <div className='w-full'>
        <Span
          className={cn(
            'input-label-base',
            disabled ? 'text-text-disabled' : 'text-text',
          )}
        >
          {label}
        </Span>
        <input
          ref={ref}
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
  },
);

InputField.displayName = 'InputField';
export default InputField;
