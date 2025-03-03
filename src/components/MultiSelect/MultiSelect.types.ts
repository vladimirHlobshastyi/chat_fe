import { Option } from '@/types/common';

export interface MultiSelectProps {
  label: string;
  options: Option[];
  placeholder?: string;
  selectedValues?: Option[];
  onChange: (selected: Option[]) => void;
}
