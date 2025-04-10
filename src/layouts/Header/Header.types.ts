import { RequiredRole } from '@/providers/RoleProvider/RoleProvider.types';

export interface HeaderTypes {
  role: RequiredRole;
  className?: string;
  isHidden: boolean;
  setIsHidden: (val: boolean) => void;
}
