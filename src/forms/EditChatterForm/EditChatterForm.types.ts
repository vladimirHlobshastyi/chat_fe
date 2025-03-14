export interface EditChatterFormData {
  name: string;
  //isVerified: boolean;
  isBanned: boolean;
  avatar?: string;
}

export interface EditChatterFormProps {
  currentChatter: EditChatterFormData;
  errorMessage?: string;
  onSubmit: (data: EditChatterFormData) => void;
  onClose: () => void;
}
