export type SortField = 'role' | 'name' | 'createdAt' | 'isVerified';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface UsersTableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}
