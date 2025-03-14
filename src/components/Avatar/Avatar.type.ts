import { HTMLAttributes } from 'react';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'default' | 'md' | 'xl';
  initials?: string;
  className?: string;
}
