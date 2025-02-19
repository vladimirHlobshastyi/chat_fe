export interface LoginFormDate {
  username: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormDate) => void;
  errorMessage?: string;
}
