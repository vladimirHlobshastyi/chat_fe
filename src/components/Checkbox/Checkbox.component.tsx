import { cn } from '@/utils/styles';
import { CheckboxProps } from './Checkbox.types';
import { Span } from '../Typography/Typography.component';

const Checkbox = ({
  label,
  checked,
  className,
  disabled,
  onChange,
  ...rest
}: CheckboxProps) => {
  return (
    <label
      htmlFor={rest.id}
      className='flex items-center cursor-pointer select-none'
    >
      <div className='relative'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='sr-only'
          disabled={disabled}
          {...rest}
        />
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-md border border-second transition-all',
            checked
              ? 'bg-primary border-primary'
              : 'border-border bg-transparent hover:border-primary',
            disabled && 'cursor-not-allowed bg-transparent border-border',
            className,
          )}
        >
          {checked && (
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11.6666 3.5L5.24992 9.91667L2.33325 7'
                stroke={disabled ? '#E5E7EB' : '#ffffff'}
                strokeWidth='1.94437'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </div>
      </div>
      {label && (
        <Span
          className={cn('ms-2 text-sm text-text', disabled && 'opacity-50')}
        >
          {label}
        </Span>
      )}
    </label>
  );
};

export default Checkbox;
