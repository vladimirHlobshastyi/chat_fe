import { SortField } from '@/types/common';
import { UserRole } from './user';

export interface QueriesParams {
  search?: string;
  page?: number;
  pageSize: number;
  sortField: string;
  sortOrder: SortField;
  role?: UserRole;
}
