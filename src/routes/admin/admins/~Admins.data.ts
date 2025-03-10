import { AdminsTableHeader } from './~Admins.types';

export const ADMINS_TABLE_HEADER: AdminsTableHeader[] = [
  {
    key: 'role',
    title: 'Role',
    width: 'min-w-20',
  },
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-33',
    //sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    width: 'min-w-33',
  },
  {
    key: 'is_verified',
    title: 'Verified',
    width: 'min-w-14',
  },
  {
    key: 'is_banned',
    title: 'Banned',
    width: 'min-w-20',
    //sortable: true,
  },
  {
    key: 'created_at',
    title: 'Created At',
    width: 'min-w-14',
    //sortable: true,
  },
  {
    key: 'updated_at',
    title: 'Updated At',
    width: 'min-w-14',
    //sortable: true,
  },
  {
    key: 'action',
    title: 'Action',
    width: 'min-w-14',
  },
];
