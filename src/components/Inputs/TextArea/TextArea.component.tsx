import { cn } from '@/utils/styles';
import { Span } from '@/components/Typography/Typography.component';
import { TextAreaProps } from './TextArea.types';

const TextArea = ({
  label,
  success,
  error,
  className,
  helperText,
  disabled,
  rows = 4,
  ...rest
}: TextAreaProps) => {
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
      <textarea
        rows={rows}
        className={cn(
          'input-base resize-y',
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

export default TextArea;
