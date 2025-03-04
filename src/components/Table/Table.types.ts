import { ReactNode } from 'react';

interface TableHeader {
  key: string;
  title: string;
  width: string;
  sortable?: boolean;
}

interface TableData {
  [key: string]: ReactNode;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TableProps {
  headers: TableHeader[];
  data: TableData[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages: number;
  totalItems: number;
  onSort?: (sortState: SortState) => void;
  onSearch?: (searchTerm: string) => void;
  onPageChange?: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}
