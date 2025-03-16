import { Option } from '@/types/common';

export interface SelectProps {
  label?: string;
  options: Option[];
  selectedValue?: string;
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}
