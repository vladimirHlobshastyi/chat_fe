interface accessedGeo {
  id: string;
  label: string;
}

export interface EditGiftFormData {
  name: string;
  geo?: accessedGeo[];
  price?: number;
  image?: File;
  isActive: boolean;
}

export interface EditGiftFormProps {
  giftUrl?: string;
  errorMessage?: string;
  initialProps: EditGiftFormData;
  onClose: () => void;
  onSubmit: (data: EditGiftFormData) => void;
}
