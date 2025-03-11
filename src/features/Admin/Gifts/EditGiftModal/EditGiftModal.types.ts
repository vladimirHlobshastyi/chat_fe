import { EditGiftFormData } from '@/forms/EditGiftForm/EditGiftForm.types';
export interface EditGiftModalProps {
  isOpen: boolean;
  errorMessage?: string;
  initialProps: EditGiftFormData;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
