export interface EditMyProfileFormData {
  name: string;
  avatar?: string;
}

export interface EditMyProfileFormProps {
  data: EditMyProfileFormData;
  errorMessage?: string;
  onSubmit: (data: EditMyProfileFormData) => void;
  onClose: () => void;
}
