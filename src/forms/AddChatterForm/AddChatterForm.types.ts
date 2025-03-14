export interface AddChatterFormData {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  avatar?: string;
  geo: string;
}

export interface AddChatterFormProps {
  onSubmit: (data: AddChatterFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
