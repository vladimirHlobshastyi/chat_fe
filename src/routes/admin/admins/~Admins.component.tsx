import { useAdmins } from './~useAdmins';
import { SortField } from './~Admins.types';
import { ADMINS_TABLE_HEADER } from './~Admins.data';
import EditAdminModal from '@/features/Admin/Admins/EditAdminModal';
import { cn } from '@/utils/styles';
import AddNewAdminModal from '@/features/Admin/Admins/AddNewAdminModal';

export const Admins = () => {
  const {
    admins,
    isLoading,
    error,
    isFetching,
    page,
    hasMore,
    isAddAdminModalOpen,
    selectedAdmin,
    addNewAdminError,
    editAdminError,
    onDeleteAdmin,
    setPage,
    getSortIcon,
    handleHeaderClick,
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
    <div className='container mx-auto p-4 flex flex-col h-full'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Admins</h1>
        <button
          className='actionButton bg-green-500 hover:bg-green-600'
          onClick={() => setIsAddAdminModalOpen(true)}
        >
          Create Admin
        </button>
      </div>

      <div className='flex-grow overflow-auto border rounded-lg'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              {ADMINS_TABLE_HEADER.map((header) => (
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
            {admins.length === 0 ? (
              <tr>
                <td
                  colSpan={ADMINS_TABLE_HEADER.length + 1}
                  className='tableCell text-center'
                >
                  No admins..
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[0].width)}>
                    {admin.role}
                  </td>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[1].width)}>
                    {admin.name}
                  </td>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[2].width)}>
                    {admin.isVerified ? 'Yes' : 'No'}
                  </td>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[3].width)}>
                    {admin.isBanned ? 'Yes' : 'No'}
                  </td>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[4].width)}>
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className={cn('tableCell', ADMINS_TABLE_HEADER[5].width)}>
                    {new Date(admin.updatedAt).toLocaleDateString()}
                  </td>
                  <td className='tableCell min-w-32 flex justify-center gap-5'>
                    <button
                      className='actionButtonEdit'
                      onClick={() => setSelectedAdmin(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className='actionButtonDelete'
                      onClick={() => onDeleteAdmin(admin.id)}
                    >
                      Delete
                    </button>
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
