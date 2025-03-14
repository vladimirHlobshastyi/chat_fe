import { CreateModelParams } from '@/api/models/types';

export type AddModelFormData = CreateModelParams;

export interface AddModelFormProps {
  errorMessage?: string;
  onSubmit: (data: AddModelFormData) => void;
  onClose: () => void;
}
