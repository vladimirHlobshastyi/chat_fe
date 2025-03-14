import { UpdateModelParams } from '@/api/models/types';
import { EditCurrentModel } from '@/forms/EditModelForm/EditModelForm.types';

export interface EditModelModalProps {
  isOpen: boolean;
  currentModel: EditCurrentModel;
  onClose: () => void;
  onSubmit: (data: UpdateModelParams) => void;
  errorMessage?: string;
}
