export interface Gift {
  id: string;
  name: string;
  restrictedCountries?: string[];
  price: number;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
