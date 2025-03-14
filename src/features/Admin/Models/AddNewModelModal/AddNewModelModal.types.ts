import { CreateModelParams } from '@/api/models/types';

export interface AddNewModelModalProps {
  isOpen: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: CreateModelParams) => void;
}
