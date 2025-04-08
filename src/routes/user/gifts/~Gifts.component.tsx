import { GIFTS_TABLE_HEADER } from './~Gifts.data';
import AddNewGiftModal from '@/features/Admin/Gifts/AddNewGiftModal';
import EditGiftModal from '@/features/Admin/Gifts/EditGiftModal';
import { useGifts } from './~useGifts';
import { H3 } from '@/components/Typography/Typography.component';
import Table from '@/components/Table';
import TableActions from '@/components/Table/TableActions';
import TableImage from '@/components/Table/TableImage';
import { convertUtcToLocal } from '@/utils/date';
import ErrorPage from '@/components/ErrorPage';
//import { MOCK_GEO_OPTIONS } from '@/common/mock';

const Gifts = () => {
  const {
    isAddNewGiftModalOpen,
    addNewGiftError,
    editGiftError,
    editInitialProps,
    gifts,
    isLoading,
    error,
    page,
    sort,
    searchValue,
    total,
    totalPages,
    setSearchValue,
    setPerPage,
    onSort,
    setPage,
    onEditGiftClose,
    //onDeleteGift,
    onEditGiftSubmit,
    onCreateGiftSubmit,
    onAddNewGiftModalClose,
    //setIsAddNewGiftModalOpen,
    //setSelectedGift,
  } = useGifts();

  if (error) return <ErrorPage label='Error loading gifts' />;

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Gifts</H3>
        </div>

        <div className='w-full h-full overflow-hidden p-6'>
          <Table
            onPerPageChange={setPerPage}
            headers={GIFTS_TABLE_HEADER}
            newItemLabel='Add New Gift'
            onAddNewItem={() => {}} /* setIsAddNewGiftModalOpen(true) */
            onSearch={(searchTerm) => setSearchValue(searchTerm)}
            onPageChange={(page) => setPage(page)}
            onSort={onSort}
            data={gifts?.map((gift) => {
              return {
                image: <TableImage src={gift.image} alt={gift.name} />,
                name: gift.name,
                price: gift.price,
                restricted_countries: 'MOCK country', //TODO will change
                is_active: gift.isActive ? 'Yes' : 'No',
                created_at: convertUtcToLocal(gift.createdAt),
                updated_at: convertUtcToLocal(gift.updatedAt),
                action: (
                  <TableActions
                    editDisabled
                    deleteDisabled
                    /* onDelete={() => onDeleteGift(gift.id)}
                    onEdit={() =>
                      setSelectedGift({
                        ...gift,
                        restrictedCountries: MOCK_GEO_OPTIONS, //TODO will change
                      })
                    } */
                  />
                ),
              };
            })}
            searchValue={searchValue}
            inputDelay={500}
            sortProps={sort}
            isLoading={isLoading}
            totalPages={totalPages}
            totalItems={total}
            currentPage={page}
          />
        </div>
      </div>

      {isAddNewGiftModalOpen && (
        <AddNewGiftModal
          errorMessage={addNewGiftError}
          isOpen={isAddNewGiftModalOpen}
          onSubmit={onCreateGiftSubmit}
          onClose={onAddNewGiftModalClose}
        />
      )}

      {editInitialProps && (
        <EditGiftModal
          initialProps={editInitialProps}
          errorMessage={editGiftError}
          isOpen={!!editInitialProps}
          onSubmit={onEditGiftSubmit}
          onClose={onEditGiftClose}
        />
      )}
    </div>
  );
};

export default Gifts;
