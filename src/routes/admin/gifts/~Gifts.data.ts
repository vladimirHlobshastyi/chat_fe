import { GiftsTableHeader } from './~Gifts.types';

export const ITEMS_PER_PAGE = 20;

export const GIFTS_TABLE_HEADER: GiftsTableHeader[] = [
  {
    key: 'name',
    title: 'Name',
    width: 'min-w-20',
    sortable: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 'min-w-33',
    sortable: true,
  },
  {
    key: 'geo',
    title: 'Geo',
    width: 'min-w-18',
    sortable: true,
  },
  {
    key: 'image',
    title: 'Image',
    width: 'min-w-14',
  },
  {
    key: 'active',
    title: 'Active',
    width: 'min-w-26',
    sortable: true,
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
];
