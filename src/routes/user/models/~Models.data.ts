import { TableHeader } from '@/components/Table/Table.types';

export const MODELS_TABLE_HEADER: TableHeader[] = [
  {
    key: 'avatar',
    title: 'Avatar',
    width: 'w-4',
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
    key: 'about',
    title: 'About',
    width: 'min-w-32 max-w-40',
  },
  {
    key: 'created_at',
    title: 'Created At',
    width: 'w-8',
    sortable: true,
  },
  /*   {
    key: 'action',
    title: 'Action',
    width: 'min-w-14',
  }, */
];
