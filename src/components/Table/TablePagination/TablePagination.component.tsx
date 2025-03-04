import { PaginationProps } from './TablePagination.types';

const TablePagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  perPage,
  onPageChange,
}: PaginationProps) => {
  const startEntry =
    totalItems === 0
      ? 0
      : Math.min((currentPage - 1) * perPage + 1, totalItems);
  const endEntry =
    totalItems === 0 ? 0 : Math.min(currentPage * perPage, totalItems);

  const renderPageButtons = () => {
    const pagesToShow: number[] = [];
    const hasLeftEllipsis = currentPage > 3;
    const hasRightEllipsis = currentPage < totalPages - 2;

    if (totalPages <= 5) {
      pagesToShow.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
    } else {
      pagesToShow.push(1);

      if (hasLeftEllipsis) pagesToShow.push(currentPage - 1);
      if (currentPage !== 1 && currentPage !== totalPages)
        pagesToShow.push(currentPage);
      if (hasRightEllipsis) pagesToShow.push(currentPage + 1);

      pagesToShow.push(totalPages);
    }

    return (
      <>
        {pagesToShow.map((page) => (
          <button
            key={page}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
              currentPage === page
                ? 'bg-primary/[0.08] text-primary'
                : 'text-gray-700 hover:bg-primary/[0.08] hover:text-primary'
            }`}
            onClick={() => onPageChange?.(page)}
          >
            {page}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className='border-t border-gray-100 py-4 pl-[18px] pr-4 mt-auto'>
      <div className='flex flex-col xl:flex-row xl:items-center xl:justify-between'>
        <div className='flex items-center justify-center gap-0.5 pb-4 xl:justify-normal xl:pt-0'>
          <button
            className='mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50'
            onClick={() => currentPage > 1 && onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>

          {renderPageButtons()}

          <button
            className='ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50'
            onClick={() =>
              currentPage < totalPages && onPageChange?.(currentPage + 1)
            }
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>

        <p className='border-t border-gray-100 pt-3 text-center text-sm font-medium text-gray-500 xl:border-t-0 xl:pt-0 xl:text-left'>
          Showing <span>{startEntry}</span> to <span>{endEntry}</span> of{' '}
          <span>{totalItems}</span> entries
        </p>
      </div>
    </div>
  );
};

export default TablePagination;
