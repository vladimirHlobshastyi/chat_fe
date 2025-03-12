import { COUNTRIES_OPTIONS } from '@/common/options';

export const getCountriesByCodes = (codes?: string[]) => {
  return COUNTRIES_OPTIONS.filter((country) => codes?.includes(country.value));
};

export const getCountryValue = (code?: string) => {
  const country = COUNTRIES_OPTIONS.find((country) => country.value === code);
  return country ? country.label : null;
};
