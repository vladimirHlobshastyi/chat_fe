export const ITEMS_PER_PAGE = 20;
export type SortField = 'price' | 'name' | 'createdAt' | 'active' | 'geo';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface GiftsTableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}
