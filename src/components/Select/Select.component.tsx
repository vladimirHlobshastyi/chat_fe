import { SelectProps } from './Select.types';

const Select = ({ label, options, selectedValue, onChange }: SelectProps) => {
  return (
    <div className='w-full'>
      <label className='block mb-1.5 text-sm font-medium text-text'>
        {label}
      </label>
      <select
        className='block w-full min-h-11 px-4 py-2.5 bg-background border border-border text-text text-sm rounded-lg focus:border-border-focus focus:outline-none focus:ring focus:ring-ring'
        value={selectedValue || ''}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        <option value=''>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
