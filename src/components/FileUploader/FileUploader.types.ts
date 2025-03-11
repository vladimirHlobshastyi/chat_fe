import type { InputHTMLAttributes, RefObject } from 'react';

export interface FileUploaderProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  accept?: string;
  ref?: RefObject<HTMLInputElement | null>;
}
