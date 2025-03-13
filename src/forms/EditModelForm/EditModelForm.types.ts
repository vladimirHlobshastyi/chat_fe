import { CreateModelParams, UpdateModelParams } from '@/api/models/types';

export type EditModelFormData = UpdateModelParams;

export type EditCurrentModel = CreateModelParams;

export interface EditModelFormProps {
  currentModel: EditCurrentModel;
  errorMessage?: string;
  onSubmit: (data: EditModelFormData) => void;
  onClose: () => void;
}
