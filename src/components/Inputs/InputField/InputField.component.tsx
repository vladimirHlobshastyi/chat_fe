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
            disabled ? 'text-text-disabled' : 'text-text-primary',
          )}
        >
          {label}
        </Span>
        <input
          ref={ref}
          type='text'
          className={cn(
            'input-base w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm shadow-theme-xs',
            'border-border text-gray-800 placeholder:text-text-disabled',
            'focus:border-border-focus focus:outline-none focus:ring focus:ring-ring-focus',
            isError &&
              'border-border-error focus:border-border-error focus:ring focus:ring-ring-error',
            isSuccess &&
              'border-border-success focus:border-border-success focus:ring focus:ring-ring-success',
            disabled &&
              'border-border-disabled text-text-disabled placeholder:text-gray-300 cursor-not-allowed',
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
