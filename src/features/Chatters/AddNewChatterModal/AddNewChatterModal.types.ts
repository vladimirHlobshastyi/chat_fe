import { AddChatterFormData } from '@/forms/AddChatterForm/AddChatterForm.types';

export interface AddNewChatterModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddChatterFormData) => void;
}
