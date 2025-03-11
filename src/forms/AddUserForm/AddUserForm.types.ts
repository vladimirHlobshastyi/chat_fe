import { CreateUserParams } from '@/api/users/types';

export type AddUserFormData = CreateUserParams;

export interface AddUserFormProps {
  errorMessage?: string;
  onSubmit: (data: AddUserFormData) => void;
  onClose: () => void;
}
