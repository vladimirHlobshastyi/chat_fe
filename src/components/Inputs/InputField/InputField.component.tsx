import { cn } from '@/utils/styles';
import { InputFieldProps } from './InputField.types';
import { Span } from '@/components/Typography/Typography.component';
import Checkbox from '@/components/Checkbox';
import { useState } from 'react';

const InputField = ({
  label,
  success,
  error,
  className,
  helperText,
  disabled,
  type,
  ...rest
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
        type={showPassword ? 'text' : type}
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
            'helper-text',
            disabled && 'text-text-disabled',
            isSuccess && 'text-text-success',
            isError && 'text-text-error',
          )}
        >
          {helperText}
        </p>
      )}

      {type === 'password' && (
        <div className='flex items-center gap-2 mt-2'>
          <Checkbox
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <span
            className='cursor-pointer text-sm text-gray-500'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputField;
