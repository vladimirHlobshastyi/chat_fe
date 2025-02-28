export interface LoginFormDate {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormDate) => void;
  errorMessage?: string;
}
