import { UsersTableHeader } from './~Users.types';

export const USERS_TABLE_HEADER: UsersTableHeader[] = [
  {
    key: 'role',
    title: 'Role',
    width: 'w-24',
    sortable: true,
  },
  {
    key: 'name',
    title: 'Name',
    width: 'w-48',
    sortable: true,
  },
  {
    key: 'geo',
    title: 'Geo',
    width: 'w-24',
  },
  {
    key: 'isVerified',
    title: 'Is Verified',
    width: 'w-28',
    sortable: true,
  },
  {
    key: 'telegramId',
    title: 'Telegram ID',
    width: 'w-32',
  },
  {
    key: 'isBanned',
    title: 'Is Banned',
    width: 'w-24',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    width: 'w-40',
    sortable: true,
  },
  {
    key: 'updatedAt',
    title: 'Updated At',
    width: 'w-40',
  },
];
