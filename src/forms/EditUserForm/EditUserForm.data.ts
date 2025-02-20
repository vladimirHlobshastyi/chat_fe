export const validators = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters',
    },
  },
  telegramId: {
    required: 'Telegram ID is required',
    minLength: {
      value: 5,
      message: 'Telegram ID must be at least 5 characters',
    },
  },
  geo: {
    required: 'Geo is required',
    length: {
      value: 2,
      message: 'Geo must have 2 characters',
    },
  },
};
