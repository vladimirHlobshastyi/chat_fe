export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
    },
  },
  geo: {
    required: 'Geo is required',
  },
  avatar: {
    required: 'Avatar is required',
  },
};
