import { ReactNode } from 'react';

export type RequiredRole = 'user' | 'admin';

export interface RoleProviderProps {
  requiredRole: RequiredRole;
  children: ReactNode;
}
