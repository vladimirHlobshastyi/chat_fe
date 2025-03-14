export interface EditAdminFormData {
  name: string;
  //isVerified: boolean;
  isBanned: boolean;
  avatar?: string;
}

export interface EditAdminFormProps {
  currentAdmin: EditAdminFormData;
  errorMessage?: string;
  onSubmit: (data: EditAdminFormData) => void;
  onClose: () => void;
}
