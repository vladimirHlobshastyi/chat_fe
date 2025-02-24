import { AddNewGiftFormData } from '@/forms/AddNewGiftForm/AddNewGiftForm.types';

export interface AddNewGiftModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddNewGiftFormData) => void;
}
