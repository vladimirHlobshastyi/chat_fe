import { User } from '@/types/user';

export interface EditUserModalProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
  onSubmit: (data: User) => void;
  errorMessage?: string;
}
