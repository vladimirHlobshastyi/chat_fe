import { User } from '@/types/user';

export type EditUserFormData = Omit<
  User,
  'avatarId' | 'updatedAt' | 'createdAt' | 'id' | 'clickId'
>;

export interface EditUserFormProps {
  currentUser: User;
  onSubmit: (data: EditUserFormData) => void;
  errorMessage?: string;
  onClose: () => void;
}
