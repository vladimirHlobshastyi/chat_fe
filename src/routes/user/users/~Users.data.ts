import { TableHeader } from '@/components/Table/Table.types';

export const USERS_TABLE_HEADER: TableHeader[] = [
  {
    key: 'action',
    title: 'Action',
    width: 'w-4',
  },
  {
    key: 'avatar',
    title: 'Avatar',
    width: 'w-4',
  },
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-4 max-w-8',
    sortable: true,
  },
  {
    key: 'geo',
    title: 'Geo',
    width: 'w-8',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    width: 'min-w-8 max-w-10',
    sortable: true,
  },
  {
    key: 'about',
    title: 'About',
    width: 'min-w-12',
  },
  {
    key: 'created_at',
    title: 'Created At',
    width: 'min-w-12',
  },
];
