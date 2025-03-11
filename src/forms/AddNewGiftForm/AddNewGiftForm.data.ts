export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters',
    },
  },
  restrictedCountries: {
    required: 'Geo is required',
  },
  price: {
    required: 'Price is required',
  },
  image: {
    required: 'Image is required',
  },
};
