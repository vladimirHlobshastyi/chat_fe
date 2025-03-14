import { UpdateUserParams } from '@/api/users/types';
import { User } from '@/types/user';

export interface EditUserModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onSubmit: (data: UpdateUserParams) => void;
  errorMessage?: string;
}
