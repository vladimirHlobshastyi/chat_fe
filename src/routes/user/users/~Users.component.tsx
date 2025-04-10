import { useUsers } from './~useUsers';
import { USERS_TABLE_HEADER } from './~Users.data';
import AddNewUserModal from '@/features/Admin/Users/AddNewUserModal';
import EditUserModal from '@/features/Admin/Users/EditUserModal';
import Table from '@/components/Table/Table.component';
import TableActions from '@/components/Table/TableActions';
import { H3 } from '@/components/Typography/Typography.component';
import { convertUtcToLocal } from '@/utils/date';
import ErrorPage from '@/components/ErrorPage';
import Avatar from '@/components/Avatar';
import { getInitials } from '@/utils/typography';
import { getCountryValue } from '@/utils/common';

export const Users = () => {
  const {
    users,
    isLoading,
    error,
    page,
    isAddUserModalOpen,
    selectedUser,
    addNewUserError,
    editUserError,
    sort,
    total,
    totalPages,
    searchValue,
    myId,
    setSearchValue,
    onSort,
    setPerPage,
    //onDeleteUser,
    setPage,
    handleCreateUser,
    handleUpdateUser,
    // setIsAddUserModalOpen,
    //setSelectedUser,
    handleAddChat,
    onEditUserClose,
    onAddNewUserClose,
  } = useUsers();

  if (error) return <ErrorPage label='Error loading users' />;

  return (
    <div className='w-full h-full p-6 bg-gray-50'>
      <div className='w-full h-full container mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col'>
        <div className='px-5 py-6 border-b border-gray-100'>
          <H3 className='font-medium text-gray-800'>Users</H3>
        </div>

        <div className='w-full h-full overflow-hidden p-6'>
          <Table
            onPerPageChange={setPerPage}
            headers={USERS_TABLE_HEADER}
            //newItemLabel='Add New User'
            onAddNewItem={() => {} /* setIsAddUserModalOpen(true) */} //TODO will change
            onSearch={(searchTerm) => setSearchValue(searchTerm)}
            onPageChange={(page) => setPage(page)}
            onSort={onSort}
            inputDelay={500}
            searchValue={searchValue}
            data={users.map((user) => {
              return {
                avatar: (
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    initials={getInitials(user.name)}
                  />
                ),
                name: user.name,
                geo: getCountryValue(user.geo),
                email: user.email,
                created_at: convertUtcToLocal(user.createdAt),
                updated_at: convertUtcToLocal(user.updatedAt),
                action: (
                  <TableActions
                    addDisabled={user.userId === myId}
                    onAdd={() => {
                      if (user.userId) handleAddChat(user.userId);
                    }}
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

      {isAddUserModalOpen && (
        <AddNewUserModal
          isOpen={isAddUserModalOpen}
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
