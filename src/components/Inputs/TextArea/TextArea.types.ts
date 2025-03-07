import type { TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  success?: boolean;
  error?: boolean;
  className?: string;
  helperText?: string;
}
