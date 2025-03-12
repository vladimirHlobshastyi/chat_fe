export interface AddNewGiftFormData {
  name: string;
  restrictedCountries?: string[];
  price?: number;
  image?: string;
  isActive: boolean;
}

export interface AddNewGiftFormProps {
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddNewGiftFormData) => void;
}
