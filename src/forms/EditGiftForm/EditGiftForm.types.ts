import { Option } from '@/types/common';

export interface EditGiftFormData {
  name: string;
  restrictedCountries?: Option[];
  price?: number;
  image?: string;
  isActive: boolean;
}

export interface EditGiftFormProps {
  giftUrl?: string;
  errorMessage?: string;
  initialProps: EditGiftFormData;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
