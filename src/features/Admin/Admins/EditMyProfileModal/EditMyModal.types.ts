import { EditMyProfileFormData } from '@/forms/EditMyProfileForm/EditMyProfileForm.types';

export interface EditMeModalProps {
  isOpen: boolean;
  data: EditMyProfileFormData;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: EditMyProfileFormData) => void;
}
