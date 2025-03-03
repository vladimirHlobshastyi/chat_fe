import useOutsideClick from '@/hooks/useOutsideClick';
import { cn } from '@/utils/styles';
import { RefObject, useRef, useState } from 'react';
import { MultiSelectProps } from './MultiSelect.types';
import { Option } from '@/types/common';

const MultiSelect = ({
  label,
  placeholder = 'Select option',
  options,
  selectedValues = [],
  onChange,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>(selectedValues);
  const [search, setSearch] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: Option) => {
    const updated = selected.some((item) => item.value === option.value)
      ? selected.filter((item) => item.value !== option.value)
      : [...selected, option];

    setSelected(updated);
    onChange(updated);
  };

  const visibleOptions = options.filter(
    (option) => !selected.some((selected) => selected.value === option.value),
  );

  const filteredOptions = visibleOptions.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  useOutsideClick(mainRef as RefObject<HTMLDivElement>, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className='w-full' ref={mainRef}>
      <label className='mb-1.5 block text-sm font-medium text-text'>
        {label}
      </label>
      <div className='relative w-full'>
        <div
          className={cn(
            'flex flex-wrap items-center min-h-11 gap-2 px-3 py-1.5 border border-gray-300 rounded-lg cursor-pointer shadow-theme-xs focus:border-border-focus focus:outline-none focus:ring focus:ring-ring',
            isOpen && 'ring border-border-focus outline-none ring-ring',
          )}
          onClick={() => setIsOpen(true)}
        >
          {selected.map((option) => (
            <div
              key={option.value}
              className='flex items-center justify-between rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800 border-minimal border-transparent hover:border-gray-200 hover:border-minimal'
            >
              {option.label}
              <button
                type='button'
                className='ml-2 text-gray-500 hover:text-gray-400'
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option);
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-3.5 w-3.5'
                  width={14}
                  height={14}
                  viewBox='0 0 14 14'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z'
                    fill=''
                  />
                </svg>
              </button>
            </div>
          ))}

          <input
            type='text'
            placeholder={!selected.length ? placeholder : ''}
            className='h-6 p-0 flex-1 border-none outline-none text-sm text-text bg-transparent focus:ring-0 focus:border-transparent placeholder:text-text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <svg
              className={cn(
                'h-5 w-5 ml-auto stroke-current transition-transform',
                isOpen && 'rotate-180',
              )}
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551'
                stroke=''
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className='absolute left-0 top-full mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-sm z-10'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className='cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option);
                    setSearch('');
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className='p-2 text-gray-500 text-sm'>No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
