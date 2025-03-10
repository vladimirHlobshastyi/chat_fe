import { Option } from '@/types/common';

export interface EditGiftFormData {
  name: string;
  geo?: Option[];
  price?: number;
  image?: File;
  isActive: boolean;
}

export interface EditGiftFormProps {
  giftUrl?: string;
  errorMessage?: string;
  initialProps: EditGiftFormData;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
