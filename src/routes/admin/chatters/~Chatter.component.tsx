import { useChatters } from './~useChatters';
import { CHATTERS_TABLE_HEADER } from './~Chatter.data';
import { H3 } from '@/components/Typography/Typography.component';
import Table from '@/components/Table';
import TableActions from '@/components/Table/TableActions';
import { formatISODate } from '@/utils/date';
import ErrorPage from '@/components/ErrorPage';
import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import AddNewChatterModal from '@/features/Chatters/AddNewChatterModal';
import EditChatterModal from '@/features/Chatters/EditChatterModal';

export const Chatters = () => {
  const {
    chatters,
    isLoading,
    error,
    page,
    isAddChatterModalOpen,
    selectedChatter,
    addNewChatterError,
    editChatterError,
    sort,
    total,
    totalPages,
    searchValue,
    setSearchValue,
    onSort,
    setPerPage,
    onDeleteChatter,
    setPage,
    handleCreateChatter,
    handleUpdateChatter,
    setIsAddChatterModalOpen,
    setSelectedChatter,
    onEditChatterClose,
    onAddNewChatterClose,
  } = useChatters();

  if (error) return <ErrorPage label='Error loading chatters' />;

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Chatters</H3>
        </div>

        <div className='w-full h-full overflow-hidden p-6'>
          <Table
            onPerPageChange={setPerPage}
            headers={CHATTERS_TABLE_HEADER}
            newItemLabel='Add New Chatter'
            onAddNewItem={() => setIsAddChatterModalOpen(true)}
            onSearch={(searchTerm) => setSearchValue(searchTerm)}
            onPageChange={(page) => setPage(page)}
            onSort={onSort}
            searchValue={searchValue}
            inputDelay={500}
            data={chatters.map((chatter) => {
              return {
                avatar: (
                  <Avatar
                    src={chatter.avatar}
                    alt={chatter.name}
                    initials={getInitials(chatter.name)}
                  />
                ),
                name: chatter.name,
                email: chatter.email,
                is_verified: chatter.isVerified ? 'Yes' : 'No',
                is_banned: chatter.isBanned ? 'Yes' : 'No',
                created_at: formatISODate(chatter.createdAt),
                updated_at: formatISODate(chatter.updatedAt),
                action: (
                  <TableActions
                    deleteDisabled
                    onDelete={() => onDeleteChatter(chatter.id)}
                    onEdit={() => setSelectedChatter(chatter)}
                  />
                ),
              };
            })}
            sortProps={sort}
            isLoading={isLoading}
            totalPages={totalPages}
            totalItems={total}
            currentPage={page}
          />
        </div>
      </div>

      {isAddChatterModalOpen && (
        <AddNewChatterModal
          isOpen={isAddChatterModalOpen}
          onClose={onAddNewChatterClose}
          onSubmit={handleCreateChatter}
          errorMessage={addNewChatterError}
        />
      )}

      {selectedChatter && (
        <EditChatterModal
          isOpen={!!selectedChatter}
          currentChatter={selectedChatter}
          errorMessage={editChatterError}
          onSubmit={handleUpdateChatter}
          onClose={onEditChatterClose}
        />
      )}
    </div>
  );
};

export default Chatters;
