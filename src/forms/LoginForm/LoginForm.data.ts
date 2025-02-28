export const validators = {
  email: {
    required: 'Email is required',
    minLength: {
      value: 4,
      message: 'Email must be at least 4 letters long',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 letters long.',
    },
  },
};
