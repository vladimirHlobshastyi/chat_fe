export type SortField = 'role' | 'name' | 'createdAt' | 'isVerified';
export type SortOrder = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface EditAdminData {
  name: string;
  email: string;
  isVerified: boolean;
  isBanned: boolean;
}

export interface AdminsTableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}
