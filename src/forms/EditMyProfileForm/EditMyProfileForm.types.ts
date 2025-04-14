import { UserRole } from '@/types/user';

export interface EditMyProfileFormData {
  name: string;
  avatar?: string;
}

export interface EditMyProfileFormProps {
  data: EditMyProfileFormData;
  errorMessage?: string;
  role: UserRole;
  onSubmit: (data: EditMyProfileFormData) => void;
  onClose: () => void;
}
