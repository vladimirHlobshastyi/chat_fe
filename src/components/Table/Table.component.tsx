import { useState } from 'react';
import { ITEMS_PER_PAGE } from './Table.data';
import TablePagination from './TablePagination';
import { TableProps } from './Table.types';
import InputField from '../Inputs/InputField';

const Table = ({
  headers,
  data,
  isLoading = false,
  currentPage = 1,
  totalPages,
  totalItems,
  onSort,
  onSearch,
  onPageChange,
  onPerPageChange,
}: TableProps) => {
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: string) => {
    const newDirection =
      sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';

    setSortField(field);
    setSortDirection(newDirection);

    if (onSort) {
      onSort({ field, direction: newDirection });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    onPerPageChange(value);
  };

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 shadow-lg flex flex-col h-full'>
      <div className='mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-gray-500'>Show</span>
          <div className='relative z-20 bg-transparent'>
            <select
              className='h-9 w-full appearance-none rounded-lg py-2 pl-3 pr-8 text-sm text-gray-500 input-base'
              value={perPage}
              onChange={(e) => handlePerPageChange(Number(e.target.value))}
            >
              {ITEMS_PER_PAGE.map((value) => (
                <option key={value} value={value} className='text-gray-500'>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <span className='text-gray-500'>entries</span>
        </div>

        <div className='min-w-80 relative flex items-center'>
          <svg
            className='fill-gray-500 absolute left-4 top-1/2 -translate-y-1/2'
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z'
            />
          </svg>

          <InputField
            className='pl-10 h-11 z-10'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='max-w-full overflow-x-auto flex-grow'>
        <div className='min-w-[1102px] h-full'>
          <table className='w-full text-sm text-left text-gray-800 h-full'>
            <thead className='border-t border-gray-200'>
              <tr>
                {headers.map((header, index) => {
                  const isCurrentSortField = sortField === header.key;

                  return (
                    <th
                      key={index}
                      className={`border-r border-gray-200 px-4 py-3 ${header.width}`}
                      onClick={() => header.sortable && handleSort(header.key)}
                    >
                      <div
                        className={`flex w-full items-center justify-between ${header.sortable ? 'cursor-pointer' : ''}`}
                      >
                        <p className='text-xs font-medium text-gray-700'>
                          {header.title}
                        </p>
                        {header.sortable && (
                          <span className='flex flex-col gap-0.5'>
                            <svg
                              className={`${isCurrentSortField && sortDirection === 'asc' ? 'fill-primary-dark' : 'fill-gray-300'}`}
                              width='8'
                              height='5'
                              viewBox='0 0 8 5'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z'
                                fill=''
                              ></path>
                            </svg>
                            <svg
                              className={`${isCurrentSortField && sortDirection === 'desc' ? 'fill-primary-dark' : 'fill-gray-300'}`}
                              width='8'
                              height='5'
                              viewBox='0 0 8 5'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z'
                                fill=''
                              ></path>
                            </svg>
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className='w-full flex-grow'>
              {isLoading && (
                <div className='fixed top-0 left-0 w-full h-full bg-gray-800 '>
                  Loading...
                </div>
              )}
              {/*   //TODO will improve */}
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className='border-t border-gray-100'>
                    {headers.map((header, cellIndex) => (
                      <td
                        key={cellIndex}
                        className='border-r border-gray-100 px-4 py-[17.5px]'
                      >
                        <p className='text-sm text-gray-700'>
                          {row[header.key]}
                        </p>
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length + 1}
                    className='px-6 py-4 text-center text-gray-500'
                  >
                    No data available
                  </td>
                </tr>
              )}
              {data.length > 0 && data.length < perPage && (
                <tr className='h-full border-t border-gray-100'>
                  <td colSpan={headers.length + 1}></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
