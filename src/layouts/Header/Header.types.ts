import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';
import { Dispatch, SetStateAction } from 'react';

export interface HeaderTypes {
  role: RequiredRole;
  className?: string;
  isHidden: boolean;
  onHide: (val: boolean) => void;
  onMobHeaderHide: Dispatch<SetStateAction<boolean>>;
}
