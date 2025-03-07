import { GIFTS_TABLE_HEADER } from './~Gifts.data';
import AddNewGiftModal from '@/features/Admin/Gifts/AddNewGiftModal';
import EditGiftModal from '@/features/Admin/Gifts/EditGiftModal';
import { useGifts } from './~useGifts';
import { H3 } from '@/components/Typography/Typography.component';
import Table from '@/components/Table';
import TableActions from '@/components/Table/TableActions';
import TableImage from '@/components/Table/TableImage';

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
    selectedGift,
    setPerPage,
    setSort,
    setPage,
    onEditGiftClose,
    onDeleteGift,
    onEditGiftSubmit,
    onCreateGiftSubmit,
    onAddNewGiftModalClose,
    setIsAddNewGiftModalOpen,
    setSelectedGift,
  } = useGifts();

  if (error) return <div>Error loading gifts</div>;

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
            onAddNewItem={() => setIsAddNewGiftModalOpen(true)}
            onSearch={() => {}} //TODO will change
            onPageChange={(page) => setPage(page)}
            onSort={setSort}
            data={gifts?.map((gift) => {
              return {
                name: gift.name,
                price: gift.price,
                geo: 'US', //Will be change
                image: <TableImage src={gift.image} alt={gift.name} />,
                active: gift.isActive ? 'Yes' : 'No',
                createdAt: gift.createdAt,
                updatedAt: gift.updatedAt,
                action: (
                  <TableActions
                    onDelete={() => onDeleteGift(gift.id)}
                    onEdit={() => setSelectedGift(gift)}
                  />
                ),
              };
            })}
            sortProps={sort}
            isLoading={isLoading}
            totalPages={10} //TODO will change
            totalItems={1} //TODO will change
            currentPage={page}
          />
        </div>
      </div>

      {editInitialProps && (
        <EditGiftModal
          giftUrl={selectedGift?.image}
          initialProps={editInitialProps}
          errorMessage={editGiftError}
          isOpen={!!editInitialProps}
          onSubmit={onEditGiftSubmit}
          onClose={onEditGiftClose}
        />
      )}

      {isAddNewGiftModalOpen && (
        <AddNewGiftModal
          errorMessage={addNewGiftError}
          isOpen={isAddNewGiftModalOpen}
          onSubmit={onCreateGiftSubmit}
          onClose={onAddNewGiftModalClose}
        />
      )}
    </div>
  );
};

export default Gifts;
