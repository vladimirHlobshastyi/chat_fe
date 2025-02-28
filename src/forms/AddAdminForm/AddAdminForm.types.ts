export interface AddAdminFormData {
  name: string;
  email: string;
  isVerified: boolean;
}

export interface AddAdminFormProps {
  onSubmit: (data: AddAdminFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
