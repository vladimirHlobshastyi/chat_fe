export interface Option {
  value: string;
  label: string;
}

export type SortField = 'asc' | 'desc';

export interface SortState {
  field: string;
  direction: SortField;
}
