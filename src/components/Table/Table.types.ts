import { SortState } from '@/types/common';
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

export interface TableProps {
  headers: TableHeader[];
  data: TableData[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  newItemLabel?: string;
  sortProps?: SortState;
  searchValue?: string;
  inputDelay?: number;
  onAddNewItem?: () => void;
  onSort?: (sortState: SortState) => void;
  onSearch?: (searchTerm: string) => void;
  onPageChange?: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}
