import { useState } from 'react';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@api/users/hooks';

type SortField = 'role' | 'name' | 'createdAt' | 'isVerified';
type SortOrder = 'asc' | 'desc';

const Users = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<{ field: SortField; order: SortOrder }>({
    field: 'createdAt',
    order: 'desc',
  });

  const { data, error, isLoading, isFetching } = useUsersQuery({
    limit: 20,
    offset: page * 20,
  });

  const createUser = useCreateUserMutation();
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  const handleSort = (field: SortField) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) return;
    return sort.order === 'asc' ? '↑' : '↓';
  };

  const handleHeaderClick = (field: SortField) => () => handleSort(field);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const users = data ?? [];
  const hasMore = users.length === 20;

  return (
    <div className='container mx-auto p-4 flex flex-col h-[calc(100vh-2rem)]'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Users</h1>
        <button
          className='actionButton bg-green-500 hover:bg-green-600'
          onClick={() => createUser.mutate({ name: 'New User', role: 'user' })}
        >
          Create User
        </button>
      </div>

      <div className='flex-grow overflow-auto border rounded-lg'>
        <table className='min-w-full bg-white'>
          <thead>
            <tr>
              <th className='tableHeader' onClick={handleHeaderClick('role')}>
                Role {getSortIcon('role')}
              </th>
              <th className='tableHeader' onClick={handleHeaderClick('name')}>
                Name {getSortIcon('name')}
              </th>
              <th className='tableHeader'>Geo</th>
              <th
                className='tableHeader'
                onClick={handleHeaderClick('isVerified')}
              >
                Is Verified {getSortIcon('isVerified')}
              </th>
              <th className='tableHeader'>Telegram ID</th>
              <th className='tableHeader'>Is Banned</th>
              <th
                className='tableHeader'
                onClick={handleHeaderClick('createdAt')}
              >
                Created At {getSortIcon('createdAt')}
              </th>
              <th className='tableHeader'>Updated At</th>
              <th className='tableHeader'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={9} className='tableCell text-center'>
                  No users..
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className='tableCell'>{user.role}</td>
                  <td className='tableCell'>{user.name}</td>
                  <td className='tableCell'>{user.geo}</td>
                  <td className='tableCell'>
                    {user.isVerified ? 'Yes' : 'No'}
                  </td>
                  <td className='tableCell'>{user.telegramId}</td>
                  <td className='tableCell'>{user.isBanned ? 'Yes' : 'No'}</td>
                  <td className='tableCell'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className='tableCell'>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                  <td className='tableCell'>
                    <button
                      className='actionButtonEdit'
                      onClick={() =>
                        updateUser.mutate({
                          id: user.id,
                          data: { name: 'Updated User' },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className='actionButtonDelete'
                      onClick={() => deleteUser.mutate(user.id)}
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
    </div>
  );
};

export default Users;
