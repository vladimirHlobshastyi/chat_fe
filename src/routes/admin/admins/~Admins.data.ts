import { AdminsTableHeader } from './~Admins.types';

export const ADMINS_TABLE_HEADER: AdminsTableHeader[] = [
  {
    key: 'role',
    title: 'Role',
    width: 'min-w-20',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-33',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    width: 'min-w-33',
  },
  {
    key: 'isVerified',
    title: 'Verified',
    width: 'min-w-14',
    sortable: true,
  },
  {
    key: 'isBanned',
    title: 'Banned',
    width: 'min-w-20',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    width: 'min-w-14',
    sortable: true,
  },
  {
    key: 'updatedAt',
    title: 'Updated At',
    width: 'min-w-14',
  },
  {
    key: 'action',
    title: 'Action',
    width: 'min-w-14',
  },
];
