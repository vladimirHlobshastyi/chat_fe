import { CreateUserParams } from '@/api/users/types';

export type AddUserFormData = CreateUserParams;

export interface AddUserFormProps {
  onSubmit: (data: AddUserFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
