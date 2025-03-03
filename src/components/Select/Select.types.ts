import { Option } from '@/types/common';

export interface SelectProps {
  label: string;
  options: Option[];
  selectedValue?: string;
  onChange: (value: string) => void;
}
