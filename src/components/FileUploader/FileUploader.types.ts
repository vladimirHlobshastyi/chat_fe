import type { InputHTMLAttributes } from 'react';

export interface FileUploaderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  accept?: string;
}
