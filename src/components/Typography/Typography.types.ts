import { ReactNode } from 'react';

export interface TextProps {
  weight?: 'normal' | 'bold' | 'medium';
  children: ReactNode;
  className?: string;
}
