import { EditAdminFormData } from '@/forms/EditAdminForm/EditAdminForm.types';
import { EditAdminData } from '@/routes/admin/admins/~Admins.types';

export interface EditAdminModalProps {
  isOpen: boolean;
  currentAdmin: EditAdminData;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: EditAdminFormData) => void;
}
