import { CreateUserParams } from '@/api/users/types';

export type AddNewAccountFormData = Omit<CreateUserParams, 'avatar'>;

export interface AddNewAccountFormProps {
  errorMessage?: string;
  onSubmit: (data: AddNewAccountFormData) => void;
  onClose: () => void;
}
