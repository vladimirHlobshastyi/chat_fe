import { EditMyProfileFormData } from '@/forms/EditMyProfileForm/EditMyProfileForm.types';
import { UserRole } from '@/types/user';

export interface EditMeModalProps {
  isOpen: boolean;
  data: EditMyProfileFormData;
  errorMessage?: string;
  role: UserRole;
  onClose: () => void;
  onSubmit: (data: EditMyProfileFormData) => void;
}
