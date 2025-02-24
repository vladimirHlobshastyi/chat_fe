import { EditGiftFormData } from '@/forms/EditGiftForm/EditGiftForm.types';
export interface EditGiftModalProps {
  isOpen: boolean;
  errorMessage?: string;
  initialProps: EditGiftFormData;
  giftUrl?: string;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
