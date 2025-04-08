import { TableHeader } from '@/components/Table/Table.types';

export const USERS_TABLE_HEADER: TableHeader[] = [
  {
    key: 'avatar',
    title: 'Avatar',
    width: 'min-w-14',
  },
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-33 max-w-40',
    sortable: true,
  },
  {
    key: 'geo',
    title: 'Geo',
    width: 'min-w-18',
  },
  {
    key: 'is_verified',
    title: 'Verified',
    width: 'min-w-14',
  },
  {
    key: 'telegram_id',
    title: 'Telegram ID',
    width: 'min-w-26',
  },
  {
    key: 'is_banned',
    title: 'Banned',
    width: 'min-w-20',
    sortable: true,
  },
  {
    key: 'created_at',
    title: 'Created At',
    width: 'min-w-14',
    sortable: true,
  },
  {
    key: 'updated_at',
    title: 'Updated At',
    width: 'min-w-14',
    sortable: true,
  },
  {
    key: 'action',
    title: 'Action',
    width: 'min-w-14',
  },
];
