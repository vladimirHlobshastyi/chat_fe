import { useGiftsQuery } from '@/api/gifts/hooks';
import { Gift } from '@/types/gift';
import { GIFTS_TABLE_HEADER } from './~Gifts.data';
import { ITEMS_PER_PAGE, SortField, SortState } from './~Gifts.types';
import { useState } from 'react';
import { cn } from '@/utils/styles';

const Gifts = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortState>({
    field: 'createdAt',
    order: 'desc',
  });

  const {
    data: gifts,
    isLoading,
    error,
    isFetching,
  } = useGiftsQuery({ limit: 10, offset: 0 });

  const hasMore = gifts?.length === ITEMS_PER_PAGE;

  const handleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sort.field === field;
    return (
      <span
        className={cn('sortIcon', isActive ? '' : 'sortIconHidden')}
        aria-hidden='true'
      >
        {sort.order === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const handleHeaderClick = (field: SortField) => () => handleSort(field);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading gifts</div>;

  return (
    <div className='container mx-auto p-4 flex flex-col h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Gifts</h1>
        <button className='actionButton bg-green-500 hover:bg-green-600'>
          Add new Gift
        </button>
      </div>

      <div className='flex-grow overflow-auto border rounded-lg'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              {GIFTS_TABLE_HEADER.map((header) => (
                <th
                  key={header.key}
                  className={`tableHeader ${header.width}`}
                  onClick={
                    header.sortable
                      ? handleHeaderClick(header.key as SortField)
                      : undefined
                  }
                >
                  {header.title}
                  {header.sortable && getSortIcon(header.key as SortField)}
                </th>
              ))}
              <th className='tableHeader min-w-48'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gifts?.length === 0 ? (
              <tr>
                <td colSpan={7} className='tableCell text-center'>
                  No gifts..
                </td>
              </tr>
            ) : (
              gifts?.map((gift: Gift) => (
                <tr key={gift.id}>
                  <td className='tableCell'>{gift.name}</td>
                  <td className='tableCell'>{gift.price}</td>
                  <td className='tableCell'>UA</td> {/* TODO Will be changed */}
                  <td className='tableCell flex justify-center'>
                    <div className='w-12 h-12 relative overflow-hidden rounded-full'>
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className='absolute object-cover w-full h-full'
                      />
                    </div>
                  </td>
                  <td className='tableCell'>{gift.isActive ? 'Yes' : 'No'}</td>
                  <td className='tableCell'>{gift.createdAt}</td>
                  <td className='tableCell'>{gift.updatedAt}</td>
                  <td className='tableCell min-w-32'>
                    <div className='flex justify-center gap-5'>
                      <button className='actionButtonEdit'>Edit</button>
                      <button className='actionButtonDelete'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='paginationContainer'>
        <button
          className='paginationButton'
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button
          className='paginationButton'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isFetching || !hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gifts;
