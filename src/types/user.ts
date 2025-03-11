export type UserRole = 'chatter' | 'admin' | 'model';

export interface User {
  id: string;
  clickId?: string;
  role: UserRole;
  name: string;
  geo?: string;
  about?: string;
  email?: string;
  avatar?: string;
  isVerified: boolean;
  telegramId: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}
