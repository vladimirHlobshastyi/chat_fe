import { InputHTMLAttributes } from 'react';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  success?: boolean;
  error?: boolean;
  className?: string;
  helperText?: string;
}
