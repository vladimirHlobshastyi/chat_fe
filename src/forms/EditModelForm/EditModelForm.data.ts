export const validators = {
  geo: {
    required: 'Name is required',
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters',
    },
  },
};
