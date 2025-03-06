import { useAdmins } from './~useAdmins';
import { ADMINS_TABLE_HEADER } from './~Admins.data';
import EditAdminModal from '@/features/Admin/Admins/EditAdminModal';
import AddNewAdminModal from '@/features/Admin/Admins/AddNewAdminModal';
import { H3 } from '@/components/Typography/Typography.component';
import Table from '@/components/Table';
import TableActions from '@/components/Table/TableActions';

export const Admins = () => {
  const {
    admins,
    isLoading,
    error,
    isFetching,
    page,
    isAddAdminModalOpen,
    selectedAdmin,
    addNewAdminError,
    editAdminError,
    sort,
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

  if (isLoading) return <div>Loading...</div>;
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
            onSearch={() => {}} //TODO will change
            onPageChange={(page) => setPage(page)}
            onSort={setSort}
            data={admins.map((admin) => {
              return {
                role: admin.role,
                name: admin.name,
                email: admin.email,
                isVerified: admin.isVerified ? 'Yes' : 'No',
                isBanned: admin.isBanned ? 'Yes' : 'No',
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
                action: (
                  <TableActions
                    onDelete={() => onDeleteAdmin(admin.id)}
                    onEdit={() => setSelectedAdmin(admin)}
                  />
                ),
              };
            })}
            sortProps={sort}
            isLoading={isFetching}
            totalPages={10} //TODO will change
            totalItems={1} //TODO will change
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
