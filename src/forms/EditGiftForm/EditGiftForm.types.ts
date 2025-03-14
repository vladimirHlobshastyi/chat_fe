export interface EditGiftFormData {
  name: string;
  restrictedCountries?: string[];
  price?: number;
  image?: string;
  isActive: boolean;
}

export interface EditGiftFormProps {
  errorMessage?: string;
  initialProps: EditGiftFormData;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
