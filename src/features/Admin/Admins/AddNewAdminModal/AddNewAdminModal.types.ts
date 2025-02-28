import { AddAdminFormData } from '@/forms/AddAdminForm/AddAdminForm.types';

export interface AddNewAdminModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddAdminFormData) => void;
}
