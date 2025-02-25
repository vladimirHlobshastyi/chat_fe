import { EditAdminData } from '@/routes/admin/admins/~Admins.types';

export type EditAdminFormData = EditAdminData;

export interface EditAdminFormProps {
  currentAdmin: EditAdminFormData;
  errorMessage?: string;
  onSubmit: (data: EditAdminFormData) => void;
  onClose: () => void;
}
