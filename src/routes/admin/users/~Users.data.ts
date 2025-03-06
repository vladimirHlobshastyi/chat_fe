import { UsersTableHeader } from './~Users.types';

export const USERS_TABLE_HEADER: UsersTableHeader[] = [
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
    key: 'geo',
    title: 'Geo',
    width: 'min-w-18',
  },
  {
    key: 'isVerified',
    title: 'Verified',
    width: 'min-w-14',
    sortable: true,
  },
  {
    key: 'telegramId',
    title: 'Telegram ID',
    width: 'min-w-26',
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
