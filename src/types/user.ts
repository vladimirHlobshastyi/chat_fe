export interface User {
  id: string;
  clickId?: string;
  role: 'user' | 'admin';
  name: string;
  geo?: string;
  about?: string;
  isVerified: boolean;
  telegramId: string;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
  avatarId?: string;
}
