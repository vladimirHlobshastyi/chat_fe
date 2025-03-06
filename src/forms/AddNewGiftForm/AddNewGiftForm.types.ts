import { Option } from '@/types/common';

export interface AddNewGiftFormData {
  name: string;
  geo: Option[];
  price?: number;
  image?: File;
  isActive: boolean;
}

export interface AddNewGiftFormProps {
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddNewGiftFormData) => void;
}
