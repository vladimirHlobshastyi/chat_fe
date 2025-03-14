export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters',
    },
  },
  geo: {
    required: 'Geo is required',
  },
  avatar: {
    required: 'Avatar is required',
  },
};
