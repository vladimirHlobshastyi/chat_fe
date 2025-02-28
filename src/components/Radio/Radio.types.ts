import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
