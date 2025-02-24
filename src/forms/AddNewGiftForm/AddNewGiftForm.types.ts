interface accessedGeo {
  id: string;
  label: string;
}

export interface AddNewGiftFormData {
  name: string;
  geo: accessedGeo[];
  price?: number;
  image?: File;
  isActive: boolean;
}

export interface AddNewGiftFormProps {
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: AddNewGiftFormData) => void;
}
