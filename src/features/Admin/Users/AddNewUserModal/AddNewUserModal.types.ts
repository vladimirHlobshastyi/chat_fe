import { User } from '@/types/user';

export interface AddNewUserModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: User) => void;
}
