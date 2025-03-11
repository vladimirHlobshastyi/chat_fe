import { SortField } from '@/types/common';

export interface QueriesParams {
  search?: string;
  page?: number;
  pageSize: number;
  sortField: string;
  sortOrder: SortField;
}
