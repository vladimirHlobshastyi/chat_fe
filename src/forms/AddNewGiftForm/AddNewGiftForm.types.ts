import { Option } from '@/types/common';

export interface AddNewGiftFormData {
  name: string;
  restrictedCountries?: Option[];
  price?: number;
  image?: string;
  isActive: boolean;
}

export interface AddNewGiftFormProps {
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddNewGiftFormData) => void;
}
