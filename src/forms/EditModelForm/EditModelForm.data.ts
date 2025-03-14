export const validators = {
  geo: {
    required: 'Geo is required',
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters',
    },
  },
};
