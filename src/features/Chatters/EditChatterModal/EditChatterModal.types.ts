import { EditChatterFormData } from '@/forms/EditChatterForm/EditChatterForm.types';
import { EditChatterData } from '@/routes/admin/chatters/~Chatter.types';

export interface EditChatterModalProps {
  isOpen: boolean;
  currentChatter: EditChatterData;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: EditChatterFormData) => void;
}
