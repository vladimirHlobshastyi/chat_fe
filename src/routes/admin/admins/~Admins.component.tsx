import { useAdmins } from './~useAdmins';
import { ADMINS_TABLE_HEADER } from './~Admins.data';
import EditAdminModal from '@/features/Admin/Admins/EditAdminModal';
import AddNewAdminModal from '@/features/Admin/Admins/AddNewAdminModal';
import { H3 } from '@/components/Typography/Typography.component';
import Table from '@/components/Table';
import TableActions from '@/components/Table/TableActions';
import { formatISODate } from '@/utils/date';

export const Admins = () => {
  const {
    admins,
    isLoading,
    error,
    page,
    isAddAdminModalOpen,
    selectedAdmin,
    addNewAdminError,
    editAdminError,
    sort,
    total,
    totalPages,
    searchValue,
    setSearchValue,
    setSort,
    setPerPage,
    onDeleteAdmin,
    setPage,
    handleCreateAdmin,
    handleUpdateAdmin,
    setIsAddAdminModalOpen,
    setSelectedAdmin,
    onEditAdminClose,
    onAddNewAdminClose,
  } = useAdmins();

  if (error) return <div>Error loading admins</div>;

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Admins</H3>
        </div>

        <div className='w-full h-full overflow-hidden p-6'>
          <Table
            onPerPageChange={setPerPage}
            headers={ADMINS_TABLE_HEADER}
            newItemLabel='Add New Admin'
            onAddNewItem={() => setIsAddAdminModalOpen(true)}
            onSearch={(searchTerm) => setSearchValue(searchTerm)}
            onPageChange={(page) => setPage(page)}
            onSort={setSort}
            searchValue={searchValue}
            inputDelay={500}
            data={admins.map((admin) => {
              return {
                role: admin.role,
                name: admin.name,
                email: admin.email,
                is_verified: admin.isVerified ? 'Yes' : 'No',
                is_banned: admin.isBanned ? 'Yes' : 'No',
                created_at: formatISODate(admin.createdAt),
                updated_at: formatISODate(admin.updatedAt),
                action: (
                  <TableActions
                    onDelete={() => onDeleteAdmin(admin.id)}
                    onEdit={() => setSelectedAdmin(admin)}
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

      {isAddAdminModalOpen && (
        <AddNewAdminModal
          isOpen={isAddAdminModalOpen}
          onClose={onAddNewAdminClose}
          onSubmit={handleCreateAdmin}
          errorMessage={addNewAdminError}
        />
      )}

      {selectedAdmin && (
        <EditAdminModal
          isOpen={!!selectedAdmin}
          currentAdmin={selectedAdmin}
          errorMessage={editAdminError}
          onSubmit={handleUpdateAdmin}
          onClose={onEditAdminClose}
        />
      )}
    </div>
  );
};

export default Admins;
