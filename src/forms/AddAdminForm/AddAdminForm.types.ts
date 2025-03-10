export interface AddAdminFormData {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  geo: string;
}

export interface AddAdminFormProps {
  onSubmit: (data: AddAdminFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
