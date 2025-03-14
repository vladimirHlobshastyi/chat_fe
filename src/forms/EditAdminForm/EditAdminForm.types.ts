import { UserRole } from '@/types/user';

export interface EditAdminFormData {
  name: string;
  //isVerified: boolean;
  isBanned: boolean;
  avatar?: string;
  role?: UserRole;
}

export interface EditAdminFormProps {
  currentAdmin: EditAdminFormData;
  errorMessage?: string;
  onSubmit: (data: EditAdminFormData) => void;
  onClose: () => void;
}
