import { TableHeader } from '@/components/Table/Table.types';

export const MODELS_TABLE_HEADER: TableHeader[] = [
  {
    key: 'avatar',
    title: 'Avatar',
    width: 'min-w-33',
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
    key: 'about',
    title: 'About',
    width: 'min-w-32',
  },
  {
    key: 'created_by',
    title: 'Created By',
    width: 'min-w-14',
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
