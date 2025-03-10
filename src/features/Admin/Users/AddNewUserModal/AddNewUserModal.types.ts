import { CreateUserParams } from '@/api/users/types';

export interface AddNewUserModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: CreateUserParams) => void;
}
