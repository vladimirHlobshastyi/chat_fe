import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'error';
  children: ReactNode | string;
}
