export interface AddUserFormData {
  name: string;
  role: 'user' | 'admin';
  telegramId: string;
  geo?: string;
  about?: string;
  isVerified: boolean;
  isBanned: boolean;
}

export interface AddUserFormProps {
  onSubmit: (data: AddUserFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
