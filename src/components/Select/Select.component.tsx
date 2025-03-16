import { cn } from '@/utils/styles';
import { SelectProps } from './Select.types';

const Select = ({
  label,
  options,
  selectedValue,
  className,
  errorMessage,
  disabled,
  onChange,
}: SelectProps) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className='block mb-1.5 text-sm font-medium text-text'>
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        className={cn(
          'block w-full min-h-11 px-4 py-2.5 bg-background border border-border text-text text-sm rounded-lg focus:outline-none',
          errorMessage
            ? 'border-border-error focus:border-border-error focus:ring focus:ring-ring-error'
            : 'focus:border-border-focus focus:ring focus:ring-ring',
        )}
        value={selectedValue || ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value={''}>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className={cn('helper-text text-text-error')}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
