import { UpdateUserParams } from '@/api/users/types';
import { User } from '@/types/user';

export type EditUserFormData = UpdateUserParams;

export interface EditUserFormProps {
  currentUser: User;
  errorMessage?: string;
  onSubmit: (data: EditUserFormData) => void;
  onClose: () => void;
}
