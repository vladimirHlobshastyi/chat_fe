import { cn } from '@/utils/styles';
import { RadioProps } from './Radio.types';

const Radio = ({ label, checked, disabled, onChange, ...rest }: RadioProps) => {
  return (
    <div>
      <label
        htmlFor={rest.id}
        className={cn(
          'relative flex items-center gap-3 text-sm font-medium cursor-pointer select-none',
          checked ? 'text-text-primary' : 'text-gray-500',
          disabled && 'cursor-not-allowed text-text-disabled',
        )}
      >
        <input
          type='radio'
          checked={checked}
          onChange={onChange}
          className='sr-only'
          disabled={disabled}
          aria-checked={checked}
          aria-disabled={disabled}
          {...rest}
        />
        <span
          className={cn(
            'flex items-center justify-center rounded-full transition-colors border border-radio w-radio h-radio',
            checked
              ? 'border-primary bg-primary'
              : 'border-border-default bg-transparent',
            disabled ? 'cursor-not-allowed' : 'hover:border-primary',
          )}
        >
          <span
            className={cn(
              'bg-white rounded-full transition-opacity w-radioInner h-radioInner',
              checked ? 'block' : 'hidden',
            )}
          />
        </span>
        {label}
      </label>
    </div>
  );
};

export default Radio;
