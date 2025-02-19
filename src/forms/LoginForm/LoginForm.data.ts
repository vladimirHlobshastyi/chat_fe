export const validators = {
  username: {
    required: 'Username is required',
    minLength: {
      value: 4,
      message: 'Username must be at least 4 letters long',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 4,
      message: 'Password must be at least 4 letters long.',
    },
  },
};
