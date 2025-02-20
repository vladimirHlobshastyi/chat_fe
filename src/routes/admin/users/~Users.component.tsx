import { useUsers } from './~useUsers';
import { SortField } from './~Users.types';
import { USERS_TABLE_HEADER } from './~Users.data';
import AddNewUserModal from '@/features/Admin/Users/AddNewUserModal';
import EditUserModal from '@/features/Admin/Users/EditUserModal';

export const Users = () => {
  const {
    users,
    isLoading,
    error,
    isFetching,
    page,
    hasMore,
    isAddModalOpen,
    selectedUser,
    addNewUserError,
    editUserError,
    onDeleteUser,
    setPage,
    getSortIcon,
    handleHeaderClick,
    handleCreateUser,
    handleUpdateUser,
    setIsAddModalOpen,
    setSelectedUser,
    onEditUserClose,
    onAddNewUserClose,
  } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className='container mx-auto p-4 flex flex-col h-[calc(100vh-2rem)]'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Users</h1>
        <button
          className='actionButton bg-green-500 hover:bg-green-600'
          onClick={() => setIsAddModalOpen(true)}
        >
          Create User
        </button>
      </div>

      <div className='flex-grow overflow-auto border rounded-lg'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              {USERS_TABLE_HEADER.map((header) => (
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
              <th className='tableHeader w-32'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={USERS_TABLE_HEADER.length + 1}
                  className='tableCell text-center'
                >
                  No users..
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className={`tableCell ${USERS_TABLE_HEADER[0].width}`}>
                    {user.role}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[1].width}`}>
                    {user.name}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[2].width}`}>
                    {user.geo}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[3].width}`}>
                    {user.isVerified ? 'Yes' : 'No'}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[4].width}`}>
                    {user.telegramId}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[5].width}`}>
                    {user.isBanned ? 'Yes' : 'No'}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[6].width}`}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className={`tableCell ${USERS_TABLE_HEADER[7].width}`}>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className='tableCell w-32'>
                    <button
                      className='actionButtonEdit'
                      onClick={() => setSelectedUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className='actionButtonDelete'
                      onClick={() => onDeleteUser(user.id)}
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

      {isAddModalOpen && (
        <AddNewUserModal
          isOpen={isAddModalOpen}
          onClose={onAddNewUserClose}
          onSubmit={handleCreateUser}
          errorMessage={addNewUserError}
        />
      )}

      {selectedUser && (
        <EditUserModal
          isOpen={!!selectedUser}
          currentUser={selectedUser}
          errorMessage={editUserError}
          onSubmit={handleUpdateUser}
          onClose={onEditUserClose}
        />
      )}
    </div>
  );
};

export default Users;
