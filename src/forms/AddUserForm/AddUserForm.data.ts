export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'Name must be at least 4 characters',
    },
  },
  telegramId: {
    required: 'Telegram ID is required',
    minLength: {
      value: 5,
      message: 'Telegram ID must be at least 5 characters',
    },
  },
};
