import { TableHeader } from '@/components/Table/Table.types';

export const GIFTS_TABLE_HEADER: TableHeader[] = [
  {
    key: 'image',
    title: 'Image',
    width: 'min-w-14',
  },
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-20 max-w-40',
    sortable: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 'min-w-33',
    sortable: true,
  },
  {
    key: 'restricted_countries',
    title: 'restricted countries',
    width: 'min-w-18 max-w-40',
    sortable: true,
  },
  {
    key: 'is_active',
    title: 'Active',
    width: 'min-w-26',
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
  },
  {
    key: 'action',
    title: 'Action',
    width: 'min-w-14',
  },
];
