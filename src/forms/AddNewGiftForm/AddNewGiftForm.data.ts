export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
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
