import { UpdateUserParams } from '@/api/users/types';
import { User } from '@/types/user';

export type EditUserFormData = UpdateUserParams;

export interface EditUserFormProps {
  currentUser: User;
  onSubmit: (data: EditUserFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
