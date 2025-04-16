export const validators = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 5,
      message: 'Password must be at least 5 characters',
    },
  },
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
