export const validators = {
  geo: {
    required: 'Geo is required',
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
    },
  },
};
