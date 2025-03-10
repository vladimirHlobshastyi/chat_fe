import { Option } from '@/types/common';

export interface MultiSelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  selectedValues?: Option[];
  className?: string;
  onChange: (selected: Option[]) => void;
}
