import { SortState } from '@/types/common';

export const initialSortProps: SortState = {
  field: 'created_at',
  direction: 'desc',
};

export const updatedAtSortProps: SortState = {
  field: 'updated_at',
  direction: 'desc',
};
